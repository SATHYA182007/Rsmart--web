import cv2
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGB")
w, h = img.size

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Define robust boxes that encompass each student's head and shoulders
students = [
    # Row 1
    {"name": "kb_mohana_rajan", "box": (50, 360, 250, 525)},
    {"name": "devi_sri",        "box": (250, 360, 450, 525)},
    {"name": "kanishka",        "box": (450, 360, 650, 525)},
    {"name": "aditya",          "box": (630, 360, 810, 525)},
    # Row 2
    {"name": "karthick",        "box": (50, 625, 250, 785)},
    {"name": "naveen",          "box": (250, 625, 450, 785)},
    {"name": "pradeep",         "box": (450, 625, 650, 785)},
    {"name": "janani",          "box": (630, 625, 810, 785)},
]

# Canvas properties
CANVAS_SIZE = (300, 300)
TARGET_HEIGHT = 270 # 90% of canvas height

for s in students:
    box = s["box"]
    print(f"Processing centered background-removal + upscaling + sharpening for {s['name']}...")
    
    # 1. Crop original card area
    cropped = img.crop((max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3])))
    
    # 2. Apply background removal using rembg (outputs RGBA)
    rgba_img = remove(cropped)
    
    # 3. Use OpenCV connected components to find and isolate only the largest component (the student)
    alpha = np.array(rgba_img.split()[-1])
    _, thresh = cv2.threshold(alpha, 10, 255, cv2.THRESH_BINARY)
    num_labels, labels_im, stats, centroids = cv2.connectedComponentsWithStats(thresh)
    
    if num_labels > 1:
        largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        clean_alpha_mask = np.zeros_like(alpha)
        clean_alpha_mask[labels_im == largest_label] = alpha[labels_im == largest_label]
    else:
        clean_alpha_mask = alpha

    # Reconstruct cleaned RGBA
    rgba_img_clean = Image.merge("RGBA", (
        rgba_img.split()[0],
        rgba_img.split()[1],
        rgba_img.split()[2],
        Image.fromarray(clean_alpha_mask)
    ))
    
    # 4. Get exact bounding box of the cleaned person
    bbox = rgba_img_clean.getbbox()
    if bbox:
        person_cropped = rgba_img_clean.crop(bbox)
        
        # 5. Resize to target height with Lanczos upscaling
        aspect_ratio = person_cropped.width / person_cropped.height
        target_width = int(TARGET_HEIGHT * aspect_ratio)
        
        person_resized = person_cropped.resize((target_width, TARGET_HEIGHT), Image.LANCZOS)
        
        # 6. Apply UnsharpMask to sharpen edges and details (simulates high quality / super-resolution)
        person_sharpened = person_resized.filter(ImageFilter.UnsharpMask(radius=1.0, percent=180, threshold=2))
        
        # 7. Create a white square canvas and center the student horizontally and align at the bottom
        canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 255))
        x_offset = (CANVAS_SIZE[0] - target_width) // 2
        y_offset = CANVAS_SIZE[1] - TARGET_HEIGHT
        
        canvas.paste(person_sharpened, (x_offset, y_offset), person_sharpened)
        
        # 8. Save final image as RGB
        final_img = canvas.convert("RGB")
        out_path = os.path.join(out_dir, f"clean_{s['name']}.png")
        final_img.save(out_path, "PNG")
        print(f"  Successfully centered and saved: {out_path} (bbox: {bbox})")
    else:
        print(f"  Error: No bounding box found for {s['name']}")

print("All 8 student portraits are processed, centered, and super-sharpened!")
