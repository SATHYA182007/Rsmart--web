from PIL import Image
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGB")
w, h = img.size

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Precise coordinates for head/shoulder crops (no package badges)
# Col 1: 60 to 240
# Col 2: 260 to 440
# Col 3: 460 to 640
# Col 4: 640 to 800
# Row 1 Y: 370 to 515
# Row 2 Y: 630 to 775

students = [
    # Row 1
    {"name": "kb_mohana_rajan", "box": (60, 370, 240, 515)},
    {"name": "devi_sri",        "box": (260, 370, 440, 515)},
    {"name": "kanishka",        "box": (460, 370, 640, 515)},
    {"name": "aditya",          "box": (640, 370, 800, 515)},
    # Row 2
    {"name": "karthick",        "box": (60, 630, 240, 775)},
    {"name": "naveen",          "box": (260, 630, 440, 775)},
    {"name": "pradeep",         "box": (460, 630, 640, 775)},
    {"name": "janani",          "box": (640, 630, 800, 775)},
]

for s in students:
    box = s["box"]
    print(f"Processing background removal for {s['name']}...")
    cropped = img.crop((max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3])))
    
    # Run rembg to remove the colored card background
    result_img = remove(cropped)
    
    # Place on solid white background
    white_bg = Image.new("RGBA", result_img.size, (255, 255, 255, 255))
    final = Image.alpha_composite(white_bg, result_img).convert("RGB")
    
    # Save the output image
    out_path = os.path.join(out_dir, f"clean_{s['name']}.png")
    final.save(out_path, "PNG")
    print(f"Saved: {out_path}")

print("Successfully cropped and removed background for all 8 students!")
