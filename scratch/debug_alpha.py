from PIL import Image
import numpy as np

img = Image.open("/Users/sathyam/Desktop/raise-smart/Rsmart--web/scratch/test_kanishka_sharp.png")
print("Image size:", img.size)

# Load rgba_img from the crop and check alpha
img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
source = Image.open(img_path).convert("RGB")
cropped = source.crop((450, 360, 650, 525))

from rembg import remove
rgba_img = remove(cropped)
bbox = rgba_img.getbbox()
print("bbox of rgba_img:", bbox)

# Check if the right side of bbox has high alpha or non-zero alpha
alpha = np.array(rgba_img.split()[-1])
print("Alpha channel shape:", alpha.shape)
non_zero_cols = np.where(alpha.any(axis=0))[0]
print("Min non-zero col:", non_zero_cols.min() if len(non_zero_cols) else "none")
print("Max non-zero col:", non_zero_cols.max() if len(non_zero_cols) else "none")
