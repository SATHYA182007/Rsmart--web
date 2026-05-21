from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path)
w, h = img.size

# Let's save a test crop of K.B. Mohana Rajan's head/shoulders area (no badge)
# The card Y starts at 380. The badge starts around Y=510.
# The X coordinates for Col 1 are 60 to 240.
crop_test = img.crop((60, 370, 240, 520))
crop_test.save("/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements/test_kb.png")
print("Saved test crop")
