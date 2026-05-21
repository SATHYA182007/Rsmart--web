from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Clean, unique filenames to bypass browser caching
students = [
    # Row 1
    {
        "name": "kb_mohana_rajan",
        "portrait_box": (82, 370, 242, 530),
        "logo_box": (118, 592, 206, 622)
    },
    {
        "name": "devi_sri",
        "portrait_box": (254, 370, 414, 530),
        "logo_box": (286, 592, 382, 622)
    },
    {
        "name": "kanishka",
        "portrait_box": (426, 370, 586, 530),
        "logo_box": (476, 592, 536, 622)
    },
    {
        "name": "aditya",
        "portrait_box": (598, 370, 758, 530),
        "logo_box": (626, 592, 730, 622)
    },
    # Row 2
    {
        "name": "karthick",
        "portrait_box": (82, 620, 242, 780),
        "logo_box": (122, 863, 202, 891)
    },
    {
        "name": "naveen",
        "portrait_box": (254, 620, 414, 780),
        "logo_box": (288, 863, 380, 891)
    },
    {
        "name": "pradeep",
        "portrait_box": (426, 620, 586, 780),
        "logo_box": (462, 863, 550, 891)
    },
    {
        "name": "janani",
        "portrait_box": (598, 620, 758, 780),
        "logo_box": (624, 863, 728, 891)
    }
]

for s in students:
    # 1. Crop and save portrait
    portrait = img.crop(s["portrait_box"])
    portrait_path = os.path.join(out_dir, f"portrait_{s['name']}.png")
    portrait.save(portrait_path, "PNG")
    
    # 2. Crop and save logo
    logo = img.crop(s["logo_box"])
    logo_path = os.path.join(out_dir, f"logo_{s['name']}.png")
    logo.save(logo_path, "PNG")
    
    print(f"Saved {s['name']}: portrait={portrait.size}, logo={logo.size}")

print("Final high-fidelity slicing complete!")
