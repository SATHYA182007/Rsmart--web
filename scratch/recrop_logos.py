from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
w, h = img.size

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Based on the 800x1066 image, the company logo strip (paloalto, leora, autodesk, etc.)
# appears at the very bottom of each card, around Y=635-660 for row 1 and Y=890-912 for row 2.
# 
# Each card spans X:
# Col 1: 60-240
# Col 2: 260-440
# Col 3: 460-640
# Col 4: 640-800

company_logos = [
    # Row 1 logos — tighter crop of logo pill only
    {"name": "logo_kb_mohana_rajan", "box": (80,  638, 232, 658)},   # "Top MNC" pill
    {"name": "logo_devi_sri",        "box": (268, 638, 428, 658)},   # paloalto logo
    {"name": "logo_kanishka",        "box": (468, 638, 596, 658)},   # leora logo
    {"name": "logo_aditya",          "box": (648, 638, 790, 658)},   # paloalto logo
    # Row 2 logos
    {"name": "logo_karthick",        "box": (80,  892, 230, 912)},   # autodesk logo
    {"name": "logo_naveen",          "box": (268, 892, 428, 912)},   # servicenow logo
    {"name": "logo_pradeep",         "box": (468, 892, 596, 912)},   # juspay logo
    {"name": "logo_janani",          "box": (648, 892, 790, 912)},   # cooper logo
]

for item in company_logos:
    def clamp(box):
        return (max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3]))
    cropped = img.crop(clamp(item["box"]))
    # Scale up 3x for clarity
    cropped_large = cropped.resize((cropped.width * 3, cropped.height * 3), Image.LANCZOS)
    out_path = os.path.join(out_dir, f"{item['name']}.png")
    cropped_large.save(out_path, "PNG")
    print(f"Saved {item['name']}: orig={cropped.size} -> scaled={cropped_large.size}")

print("\nCompany logo re-crop done!")
