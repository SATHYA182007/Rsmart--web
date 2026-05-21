from PIL import Image
import os

folder = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
files = [
    "portrait_kb_mohana_rajan.png",
    "portrait_devi_sri.png",
    "portrait_kanishka.png",
    "portrait_aditya.png",
    "portrait_karthick.png",
    "portrait_naveen.png",
    "portrait_pradeep.png",
    "portrait_janani.png",
]
for f in files:
    path = os.path.join(folder, f)
    if os.path.exists(path):
        img = Image.open(path)
        print(f"{f}: size={img.size}, mode={img.mode}")

r_placement_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
if os.path.exists(r_placement_path):
    img = Image.open(r_placement_path)
    print(f"r-placement.jpeg: size={img.size}, mode={img.mode}")
