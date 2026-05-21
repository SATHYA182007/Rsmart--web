import cv2
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/image.png"
if not os.path.exists(img_path):
    print(f"Error: {img_path} does not exist!")
    exit(1)

img = Image.open(img_path).convert("RGB")
w, h = img.size
print(f"Loaded image.png size: {w}x{h}")

# In a 1536x1024 image, each of the 8 grid cells is exactly 384x512
cell_w = 384
cell_h = 512

students = [
    # Row 1
    {"name": "kb_mohana_rajan", "row": 0, "col": 0},
    {"name": "devi_sri",        "row": 0, "col": 1},
    {"name": "kanishka",        "row": 0, "col": 2},
    {"name": "aditya",          "row": 0, "col": 3},
    # Row 2
    {"name": "karthick",        "row": 1, "col": 0},
    {"name": "naveen",          "row": 1, "col": 1},
    {"name": "pradeep",         "row": 1, "col": 2},
    {"name": "janani",          "row": 1, "col": 3},
]

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

CANVAS_SIZE = (300, 300)
TARGET_HEIGHT = 270 # 90% of canvas height

for s in students:
    r = s["row"]
    c = s["col"]
    print(f"Processing student {s['name']} from row {r}, col {c}...")
    
    # Calculate exact coordinate box
    x1 = c * cell_w
    y1 = r * cell_h
    x2 = x1 + cell_w
    y2 = y1 + cell_h
    
    # 1. Crop cell
    cropped = img.crop((x1, y1, x2, y2))
    
    # 2. Remove white background (rembg handles white background perfectly)
    rgba_img = remove(cropped)
    
    # 3. Clean mask using connected components to prevent stray pixels from throwing off centering
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
    
    # 4. Get bounding box of the student
    bbox = rgba_img_clean.getbbox()
    if bbox:
        person_cropped = rgba_img_clean.crop(bbox)
        
        # 5. Scale to target height (LANCZOS)
        aspect_ratio = person_cropped.width / person_cropped.height
        target_width = int(TARGET_HEIGHT * aspect_ratio)
        
        person_resized = person_cropped.resize((target_width, TARGET_HEIGHT), Image.LANCZOS)
        
        # 6. Apply mild UnsharpMask to ensure supreme crispness
        person_sharpened = person_resized.filter(ImageFilter.UnsharpMask(radius=0.8, percent=120, threshold=1))
        
        # 7. Create white background canvas
        canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 255))
        
        # Center horizontally, bottom aligned
        x_offset = (CANVAS_SIZE[0] - target_width) // 2
        y_offset = CANVAS_SIZE[1] - TARGET_HEIGHT
        
        canvas.paste(person_sharpened, (x_offset, y_offset), person_sharpened)
        
        # 8. Save final image
        final_img = canvas.convert("RGB")
        out_path = os.path.join(out_dir, f"clean_{s['name']}.png")
        final_img.save(out_path, "PNG")
        print(f"  Saved perfectly centered high-res portrait to: {out_path} (bbox: {bbox})")
    else:
        print(f"  Error: No bounding box found for {s['name']}")

print("All 8 student portraits are processed and saved in highest quality!")
