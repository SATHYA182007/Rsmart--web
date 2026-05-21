from PIL import Image
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
print(f"Using image path: {img_path}")
img = Image.open(img_path)
width, height = img.size
print(f"Dimensions: width={width}, height={height}")
