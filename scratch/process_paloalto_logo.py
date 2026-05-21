from PIL import Image, ImageChops
import os

def autocrop(image, background_color=(255, 255, 255, 255)):
    # If the image is RGBA, we can convert background transparent/white
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Create background image to find bounding box
    bg = Image.new('RGBA', image.size, background_color)
    diff = ImageChops.difference(image, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return image.crop(bbox)
    return image

def main():
    src_path = '/Users/sathyam/.gemini/antigravity/brain/2fb956ad-c1f5-488d-b1ad-a09991bd9f90/media__1779252220555.png'
    if not os.path.exists(src_path):
        print("Source image not found at:", src_path)
        return
        
    img = Image.open(src_path)
    print("Original size:", img.size)
    
    # Autocrop transparent/white boundaries
    cropped = autocrop(img)
    print("Cropped size:", cropped.size)
    
    # Target height is 69px
    target_height = 69
    aspect_ratio = cropped.width / cropped.height
    target_width = int(target_height * aspect_ratio)
    
    # Resize
    resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
    print("Resized size:", resized.size)
    
    # Convert to RGB (white background) to match the other logos
    final_img = Image.new('RGB', resized.size, (255, 255, 255))
    final_img.paste(resized, mask=resized.split()[3]) # paste using alpha mask
    
    # Save to both paths
    dest1 = 'public/placements/logo_devi_sri.png'
    dest2 = 'public/placements/logo_aditya.png'
    
    final_img.save(dest1, 'PNG')
    final_img.save(dest2, 'PNG')
    print(f"Saved to {dest1} and {dest2}")

if __name__ == '__main__':
    main()
