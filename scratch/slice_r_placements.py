from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
width, height = img.size

# Target directory
out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Row 1 Y bounds: 375 to 535
# Row 2 Y bounds: 625 to 785
# X bounds for the 4 columns:
# Col 1: 82 to 242
# Col 2: 254 to 414
# Col 3: 426 to 586
# Col 4: 598 to 758

students = [
    # Row 1
    {"name": "student_1", "box": (82, 375, 242, 535)},  # K.B. Mohana Rajan
    {"name": "student_2", "box": (254, 375, 414, 535)}, # Devi Sri S
    {"name": "student_3", "box": (426, 375, 586, 535)}, # Kanishka R
    {"name": "student_4", "box": (598, 375, 758, 535)}, # Aditya S
    # Row 2
    {"name": "student_5", "box": (82, 625, 242, 785)},  # Karthick Balashanmugam
    {"name": "student_6", "box": (254, 625, 414, 785)}, # R. Naveen Kumar
    {"name": "student_7", "box": (426, 625, 586, 785)}, # Pradeep J
    {"name": "student_8", "box": (598, 625, 758, 785)}  # Janani K
]

for s in students:
    cropped = img.crop(s["box"])
    out_path = os.path.join(out_dir, f"{s['name']}.png")
    cropped.save(out_path, "PNG")
    print(f"Saved {s['name']} to {out_path} with size {cropped.size}")

print("Slicing completed successfully!")
