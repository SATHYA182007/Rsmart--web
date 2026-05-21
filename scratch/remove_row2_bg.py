from PIL import Image
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGB")
w, h = img.size

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"

# Let's adjust Row 2 Y start to 656 to completely bypass the logo pills from Row 1
# Row 2 Y ends at 775, which is just above the package badges.
row2_students = [
    {"name": "karthick",        "box": (60, 656, 240, 775)},
    {"name": "naveen",          "box": (260, 656, 440, 775)},
    {"name": "pradeep",         "box": (460, 656, 640, 775)},
    {"name": "janani",          "box": (640, 656, 800, 775)},
]

for s in row2_students:
    box = s["box"]
    print(f"Processing background removal for Row 2 student {s['name']}...")
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

print("Successfully cropped and removed background for Row 2 students!")
