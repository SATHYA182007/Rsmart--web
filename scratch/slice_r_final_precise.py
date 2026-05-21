from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
w, h = img.size
print(f"Image size: {w}x{h}")

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Precise bounds derived from visual inspection of 800x1066 image
# Row 1 student cards: Y 380-618
# Row 2 student cards: Y 642-872
# Col 1: X 60-240
# Col 2: X 260-440
# Col 3: X 460-640
# Col 4: X 660-800 (capped at edge)

# Logo rows:
# Row 1 logos: Y 618-652
# Row 2 logos: Y 872-905

students = [
    # Row 1 - 4 students
    {
        "name": "kb_mohana_rajan",
        "portrait": (60,  380, 240, 618),
        "logo":     (87,  618, 205, 652),
    },
    {
        "name": "devi_sri",
        "portrait": (260, 380, 440, 618),
        "logo":     (271, 618, 415, 652),
    },
    {
        "name": "kanishka",
        "portrait": (460, 380, 640, 618),
        "logo":     (466, 618, 592, 652),
    },
    {
        "name": "aditya",
        "portrait": (640, 380, 800, 618),
        "logo":     (613, 618, 757, 652),
    },
    # Row 2 - 4 students
    {
        "name": "karthick",
        "portrait": (60,  642, 240, 872),
        "logo":     (87,  872, 205, 906),
    },
    {
        "name": "naveen",
        "portrait": (260, 642, 440, 872),
        "logo":     (271, 872, 415, 906),
    },
    {
        "name": "pradeep",
        "portrait": (460, 642, 640, 872),
        "logo":     (466, 872, 592, 906),
    },
    {
        "name": "janani",
        "portrait": (640, 642, 800, 872),
        "logo":     (613, 872, 757, 906),
    },
]

for s in students:
    # Clamp boxes to image bounds
    def clamp(box):
        return (max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3]))

    p = img.crop(clamp(s["portrait"]))
    p_path = os.path.join(out_dir, f"portrait_{s['name']}.png")
    p.save(p_path, "PNG")

    l = img.crop(clamp(s["logo"]))
    l_path = os.path.join(out_dir, f"logo_{s['name']}.png")
    l.save(l_path, "PNG")

    print(f"[{s['name']}] portrait={p.size}  logo={l.size}")

print("\nAll done!")
