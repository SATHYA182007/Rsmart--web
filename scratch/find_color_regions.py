from PIL import Image

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
width, height = img.size

col_centers = [162, 334, 506, 678]

for col_idx, cx in enumerate(col_centers):
    print(f"\n--- Column {col_idx+1} (X={cx}) ---")
    for y in range(0, height, 40):
        # Read the pixel at (cx, y)
        r, g, b = img.getpixel((cx, y))[:3]
        # Calculate standard deviation
        avg = (r + g + b) / 3
        variance = ((r - avg)**2 + (g - avg)**2 + (b - avg)**2) / 3
        std = variance ** 0.5
        if std > 15:
            print(f"Y={y:3d}: RGB=({r:3d}, {g:3d}, {b:3d}) Std={std:.1f}")
