from PIL import Image
import os

img_path = "/Users/sathyam/.gemini/antigravity/brain/30c1cee7-9de2-4b95-a922-fb313586789c/media__1779181404230.png"
if not os.path.exists(img_path):
    # Try the other timestamp if needed
    img_path = "/Users/sathyam/.gemini/antigravity/brain/30c1cee7-9de2-4b95-a922-fb313586789c/media__1779181025267.png"

print(f"Using image path: {img_path}")
img = Image.open(img_path)
width, height = img.size
print(f"Dimensions: width={width}, height={height}")
