from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Define X, Y boxes for company logos
# Row 1 logos: Y from 592 to 622
# Row 2 logos: Y from 860 to 890
# Col X bounds:
# Col 1: 110 to 215
# Col 2: 280 to 388 (paloalto)
# Col 3: 460 to 552 (Leora)
# Col 4: 620 to 736 (paloalto) -> wait, let's adjust for column centers
# Let's adjust precisely:
# Col 1: 120 to 204
# Col 2: 290 to 378
# Col 3: 460 to 552
# Col 4: 632 to 724
# Row 2 Col 1: 120 to 204
# Row 2 Col 2: 290 to 378
# Row 2 Col 3: 460 to 552
# Row 2 Col 4: 632 to 724

logos = [
    # Row 1
    {"name": "logo_1", "box": (118, 592, 206, 622)},  # Top MNC
    {"name": "logo_2", "box": (286, 592, 382, 622)},  # Palo Alto
    {"name": "logo_3", "box": (476, 592, 536, 622)},  # Leora
    {"name": "logo_4", "box": (626, 592, 730, 622)},  # Palo Alto
    # Row 2
    {"name": "logo_5", "box": (122, 863, 202, 891)},  # Autodesk
    {"name": "logo_6", "box": (288, 863, 380, 891)},  # ServiceNow
    {"name": "logo_7", "box": (462, 863, 550, 891)},  # JusPay
    {"name": "logo_8", "box": (624, 863, 728, 891)}   # Mr. Cooper
]

for l in logos:
    cropped = img.crop(l["box"])
    out_path = os.path.join(out_dir, f"{l['name']}.png")
    cropped.save(out_path, "PNG")
    print(f"Saved {l['name']} to {out_path} with size {cropped.size}")

print("Logo slicing complete!")
