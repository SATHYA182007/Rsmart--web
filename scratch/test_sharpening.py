from PIL import Image, ImageFilter
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGB")
w, h = img.size

# Let's crop Kanishka as a test
# Kanishka box: (450, 360, 650, 525)
cropped = img.crop((450, 360, 650, 525))

# Remove background
rgba_img = remove(cropped)

# Bounding box of non-transparent
bbox = rgba_img.getbbox()
person_cropped = rgba_img.crop(bbox)

# Scale up with Lanczos to a larger size, say 400x400 target height
target_height = 360
aspect_ratio = person_cropped.width / person_cropped.height
target_width = int(target_height * aspect_ratio)

# Upscale
person_upscaled = person_cropped.resize((target_width, target_height), Image.LANCZOS)

# Apply Unsharp Mask to sharpen details
person_sharpened = person_upscaled.filter(ImageFilter.UnsharpMask(radius=1.0, percent=180, threshold=2))

# Save comparison
out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/scratch"
os.makedirs(out_dir, exist_ok=True)

# Normal resize
canvas_normal = Image.new("RGBA", (400, 400), (255, 255, 255, 255))
canvas_normal.paste(person_upscaled, ((400 - target_width) // 2, 400 - target_height), person_upscaled)
canvas_normal.convert("RGB").save(os.path.join(out_dir, "test_kanishka_normal.png"))

# Sharpened resize
canvas_sharp = Image.new("RGBA", (400, 400), (255, 255, 255, 255))
canvas_sharp.paste(person_sharpened, ((400 - target_width) // 2, 400 - target_height), person_sharpened)
canvas_sharp.convert("RGB").save(os.path.join(out_dir, "test_kanishka_sharp.png"))

print("Saved test comparison in scratch folder!")
