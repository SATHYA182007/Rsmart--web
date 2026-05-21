import cv2
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove
import os

img_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/r-placement.jpeg"
img = Image.open(img_path).convert("RGB")
w, h = img.size

# Crop Kanishka
cropped = img.crop((450, 360, 650, 525))

# Remove background
rgba_img = remove(cropped)

# Convert alpha channel to numpy array
alpha = np.array(rgba_img.split()[-1])

# Threshold alpha to get binary mask
_, thresh = cv2.threshold(alpha, 10, 255, cv2.THRESH_BINARY)

# Find connected components
num_labels, labels_im, stats, centroids = cv2.connectedComponentsWithStats(thresh)

# Find the largest component (excluding background component 0)
if num_labels > 1:
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    # Create mask of only the largest component
    clean_alpha_mask = np.zeros_like(alpha)
    clean_alpha_mask[labels_im == largest_label] = alpha[labels_im == largest_label]
else:
    clean_alpha_mask = alpha

# Reconstruct RGBA image with cleaned alpha mask
rgba_img_clean = Image.merge("RGBA", (
    rgba_img.split()[0],
    rgba_img.split()[1],
    rgba_img.split()[2],
    Image.fromarray(clean_alpha_mask)
))

# Get bounding box of cleaned alpha mask
bbox = rgba_img_clean.getbbox()
print("Cleaned bbox:", bbox)

if bbox:
    person_cropped = rgba_img_clean.crop(bbox)
    
    # Resize with high quality
    target_height = 360
    aspect_ratio = person_cropped.width / person_cropped.height
    target_width = int(target_height * aspect_ratio)
    
    person_upscaled = person_cropped.resize((target_width, target_height), Image.LANCZOS)
    
    # Apply Unsharp Mask to sharpen details
    person_sharpened = person_upscaled.filter(ImageFilter.UnsharpMask(radius=1.0, percent=180, threshold=2))
    
    # Center on canvas
    canvas = Image.new("RGBA", (400, 400), (255, 255, 255, 255))
    x_offset = (400 - target_width) // 2
    y_offset = 400 - target_height
    canvas.paste(person_sharpened, (x_offset, y_offset), person_sharpened)
    
    out_path = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/scratch/test_kanishka_cleaned.png"
    canvas.convert("RGB").save(out_path)
    print("Saved cleanCentered result to:", out_path)
else:
    print("No bbox found")
