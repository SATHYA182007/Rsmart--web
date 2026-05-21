from PIL import Image
import os

img_path = "/Users/sathyam/.gemini/antigravity/brain/30c1cee7-9de2-4b95-a922-fb313586789c/media__1779181404230.png"
if not os.path.exists(img_path):
    img_path = "/Users/sathyam/.gemini/antigravity/brain/30c1cee7-9de2-4b95-a922-fb313586789c/media__1779181025267.png"

img = Image.open(img_path)
width, height = img.size

# Target directory
out_dir = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(out_dir, exist_ok=True)

# Define custom boxes for the 7 students to ensure they are centered and cropped beautifully.
# Dimensions: width=1024, height=359
# Format: (left, top, right, bottom)
boxes = [
    (24, 110, 150, 310),   # 1. Karthick Balashanmugam
    (155, 110, 286, 310),  # 2. Kanishka R
    (288, 110, 422, 310),  # 3. Devi Sri S
    (415, 80, 580, 310),   # 4. K.B. Mohana Rajan (larger, higher top boundary!)
    (580, 110, 712, 310),  # 5. Immanuel Edward Henrick J
    (714, 110, 842, 310),  # 6. Aditya S
    (844, 110, 966, 310),  # 7. R. Naveen Kumar
]

for i, box in enumerate(boxes):
    student_img = img.crop(box)
    
    # Save the cropped image
    out_path = os.path.join(out_dir, f"student_{i+1}.png")
    student_img.save(out_path, "PNG")
    print(f"Saved student {i+1} to {out_path} with size {student_img.size}")

print("Slicing complete!")
