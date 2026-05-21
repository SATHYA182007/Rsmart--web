from PIL import Image
import os

folder = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
for i in range(1, 9):
    path = os.path.join(folder, f"student_{i}.png")
    if os.path.exists(path):
        img = Image.open(path)
        print(f"student_{i}.png: size={img.size}, mode={img.mode}")
    else:
        print(f"student_{i}.png does not exist")
