from PIL import Image

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
w, h = img.size

# Scan column 2 (Devi Sri/Naveen) at X=340 from Y=600 downward
# looking for dark pill background (company logo region)
print("Scanning column 2 (X=340) from Y=600 to Y=1000:")
for y in range(600, 1000, 2):
    r, g, b = img.getpixel((340, y))[:3]
    brightness = (r + g + b) / 3
    avg = brightness
    variance = ((r-avg)**2 + (g-avg)**2 + (b-avg)**2) / 3
    std = variance**0.5
    print(f"Y={y}: R={r:3d} G={g:3d} B={b:3d} brightness={brightness:.0f} std={std:.1f}")
