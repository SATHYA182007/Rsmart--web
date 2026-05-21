from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
w, h = img.size

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"

# Scan each column in row 2 for the logo band
# Row 2 name strip approx Y=868-895, logo pill Y=900-925
# Row 1 name strip approx Y=620-645, logo pill Y=645-665

# Re-do row2 logos with corrected Y range
row2_logos = [
    {"name": "logo_karthick", "box": (80,  905, 232, 930)},
    {"name": "logo_naveen",   "box": (268, 905, 428, 930)},
    {"name": "logo_pradeep",  "box": (468, 905, 596, 930)},
    {"name": "logo_janani",   "box": (648, 905, 792, 930)},
]

for item in row2_logos:
    def clamp(box):
        return (max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3]))
    cropped = img.crop(clamp(item["box"]))
    large = cropped.resize((cropped.width * 3, cropped.height * 3), Image.LANCZOS)
    path = os.path.join(out_dir, f"{item['name']}.png")
    large.save(path, "PNG")
    print(f"Saved {item['name']}: orig={cropped.size}")

# Also re-verify row1 logos at correct Y
row1_logos = [
    {"name": "logo_kb_mohana_rajan", "box": (80,  645, 232, 668)},
    {"name": "logo_devi_sri",        "box": (268, 645, 428, 668)},
    {"name": "logo_kanishka",        "box": (468, 645, 596, 668)},
    {"name": "logo_aditya",          "box": (648, 645, 792, 668)},
]

for item in row1_logos:
    def clamp(box):
        return (max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3]))
    cropped = img.crop(clamp(item["box"]))
    large = cropped.resize((cropped.width * 3, cropped.height * 3), Image.LANCZOS)
    path = os.path.join(out_dir, f"{item['name']}.png")
    large.save(path, "PNG")
    print(f"Saved {item['name']}: orig={cropped.size}")

print("Done!")
