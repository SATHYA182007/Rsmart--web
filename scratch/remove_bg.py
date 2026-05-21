from PIL import Image
import os
import io

# rembg uses AI (U2Net model) to remove background
from rembg import remove

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGBA")
w, h = img.size
print(f"Source image: {w}x{h}")

out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Crop full student card regions (faces + bodies, NOT the package badge at bottom)
# We want each person's body, cropped from just above the top colored card edge
# to just before the package badge text
#
# Row 1 cards: Y ~385 to ~580 (face + body only, before package badge)
# Row 2 cards: Y ~650 to ~840 (face + body only, before package badge)
# Col bounds (same as before):
# Col 1: X 62 - 238
# Col 2: X 262 - 438
# Col 3: X 462 - 638
# Col 4: X 638 - 796

students = [
    # Row 1 — just the person, cropping out the badge
    {"name": "kb_mohana_rajan", "box": (62, 385, 238, 565)},
    {"name": "devi_sri",        "box": (262, 385, 438, 565)},
    {"name": "kanishka",        "box": (462, 385, 638, 565)},
    {"name": "aditya",          "box": (638, 385, 796, 565)},
    # Row 2
    {"name": "karthick",        "box": (62, 650, 238, 835)},
    {"name": "naveen",          "box": (262, 650, 438, 835)},
    {"name": "pradeep",         "box": (462, 650, 638, 835)},
    {"name": "janani",          "box": (638, 650, 796, 835)},
]

def clamp(box, w, h):
    return (max(0, box[0]), max(0, box[1]), min(w, box[2]), min(h, box[3]))

img_rgb = Image.open(img_path).convert("RGB")

for s in students:
    print(f"\nProcessing: {s['name']}...")
    # Crop the person from the source image
    cropped = img_rgb.crop(clamp(s["box"], w, h))
    
    # Scale up 2× for better rembg accuracy
    scale = 2
    large = cropped.resize((cropped.width * scale, cropped.height * scale), Image.LANCZOS)
    
    # Convert to bytes for rembg
    buf = io.BytesIO()
    large.save(buf, format="PNG")
    buf.seek(0)
    
    # Remove background using AI (U2Net)
    result_bytes = remove(buf.read())
    result_img = Image.open(io.BytesIO(result_bytes)).convert("RGBA")
    
    # Composite onto white background
    white_bg = Image.new("RGBA", result_img.size, (255, 255, 255, 255))
    final = Image.alpha_composite(white_bg, result_img).convert("RGB")
    
    # Save
    out_path = os.path.join(out_dir, f"clean_{s['name']}.png")
    final.save(out_path, "PNG", quality=95)
    print(f"  Saved: {out_path}  ({final.size[0]}x{final.size[1]})")

print("\n✅ All 8 portraits processed with white background!")
