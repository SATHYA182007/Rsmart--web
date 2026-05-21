from PIL import Image
from rembg import remove

img = Image.open("/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements/test_kb.png").convert("RGBA")
# Remove background - when passed a PIL Image, rembg.remove returns a PIL Image directly
result_img = remove(img)

# Create a clean white background
white_bg = Image.new("RGBA", result_img.size, (255, 255, 255, 255))
final = Image.alpha_composite(white_bg, result_img).convert("RGB")
final.save("/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements/test_kb_clean.png", "PNG")
print("Saved clean test image successfully!")
