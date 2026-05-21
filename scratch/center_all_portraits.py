from PIL import Image
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGB")
w, h = img.size

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Wide boxes to ensure we capture the entire student including hair and shoulders
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

# Standard size for final centered student canvas
CANVAS_SIZE = (300, 300)

for s in students:
    box = s["box"]
    print(f"Processing centered background removal for {s['name']}...")
    cropped = img.crop((max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3])))
    
    # Run rembg to remove the colored card background and get transparency (RGBA)
    rgba_img = remove(cropped)
    
    # Get the bounding box of non-transparent pixels
    bbox = rgba_img.getbbox()
    if bbox:
        # Crop exactly to the person's body
        person_cropped = rgba_img.crop(bbox)
        
        # Calculate target height (we want the person to fill about 90% of the canvas height)
        target_height = int(CANVAS_SIZE[1] * 0.90)
        aspect_ratio = person_cropped.width / person_cropped.height
        target_width = int(target_height * aspect_ratio)
        
        # Resize the person with high quality LANCZOS
        person_resized = person_cropped.resize((target_width, target_height), Image.LANCZOS)
        
        # Create a new white canvas
        canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 255))
        
        # Calculate offset to center the person horizontally and align at the bottom
        x_offset = (CANVAS_SIZE[0] - target_width) // 2
        y_offset = CANVAS_SIZE[1] - target_height
        
        # Paste the person onto the canvas
        canvas.paste(person_resized, (x_offset, y_offset), person_resized)
        
        # Convert to RGB and save
        final_img = canvas.convert("RGB")
        out_path = os.path.join(out_dir, f"clean_{s['name']}.png")
        final_img.save(out_path, "PNG")
        print(f"  Successfully centered and saved: {out_path} at size {CANVAS_SIZE}")
    else:
        print(f"  Error: Could not find bounding box for {s['name']}")

print("All 8 student portraits are perfectly centered and saved!")
