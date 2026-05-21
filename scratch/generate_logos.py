"""
Generate clean, high-quality company logos for placement cards.
Uses Pillow to render branded text logos.
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/Users/sathyam/Desktop/raise-smart/Rsmart--web/public/placements"
os.makedirs(OUT, exist_ok=True)

W, H = 400, 120  # canvas size
SCALE = 2        # 2x for retina quality -> saved at 200x60 display size

def make_canvas():
    return Image.new("RGBA", (W * SCALE, H * SCALE), (255, 255, 255, 0))

def save(img, name):
    out_w, out_h = W, H
    final = img.resize((out_w, out_h), Image.LANCZOS)
    path = os.path.join(OUT, name)
    final.save(path, "PNG")
    print(f"Saved {name}")
    return final

def try_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return None

def get_font(size, bold=False):
    candidates = [
        f"/System/Library/Fonts/Helvetica{'Neue' if bold else ''}.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Arial Bold.ttf" if bold else "/System/Library/Fonts/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/SFNSDisplay-Bold.otf" if bold else "/System/Library/Fonts/SFNS.ttf",
    ]
    for c in candidates:
        f = try_font(c, size)
        if f:
            return f
    return ImageFont.load_default()

# ─────────────────────────────────────────
# 1. Palo Alto Networks
# Brand: orange #FA4616, dark navy text
# ─────────────────────────────────────────
def make_paloalto():
    img = make_canvas()
    d = ImageDraw.Draw(img)
    sw, sh = W * SCALE, H * SCALE

    # Draw the stylised "PA" shield icon on the left
    icon_x, icon_y = 28 * SCALE, 20 * SCALE
    icon_size = 70 * SCALE
    # Orange rounded square background
    d.rounded_rectangle(
        [icon_x, icon_y, icon_x + icon_size, icon_y + icon_size],
        radius=12 * SCALE, fill=(250, 70, 22, 255)
    )
    # White "PA" inside
    font_icon = get_font(28 * SCALE, bold=True)
    d.text((icon_x + icon_size // 2, icon_y + icon_size // 2), "PA",
           font=font_icon, fill=(255, 255, 255, 255), anchor="mm")

    # Company name text
    font_main = get_font(24 * SCALE, bold=True)
    font_sub = get_font(13 * SCALE)
    text_x = (icon_x + icon_size + 20 * SCALE)
    d.text((text_x, icon_y + 10 * SCALE), "Palo Alto",
           font=font_main, fill=(15, 23, 42, 255))
    d.text((text_x, icon_y + 42 * SCALE), "Networks",
           font=font_main, fill=(250, 70, 22, 255))

    return save(img, "logo_devi_sri.png"), save(img, "logo_aditya.png")

# ─────────────────────────────────────────
# 2. Leora (Kanishka's company)
# Clean teal/purple brand
# ─────────────────────────────────────────
def make_leora():
    img = make_canvas()
    d = ImageDraw.Draw(img)
    sw, sh = W * SCALE, H * SCALE

    # Circle icon with "L"
    cx, cy, r = 55 * SCALE, 60 * SCALE, 32 * SCALE
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(79, 70, 229, 255))
    font_icon = get_font(26 * SCALE, bold=True)
    d.text((cx, cy), "L", font=font_icon, fill=(255, 255, 255, 255), anchor="mm")

    # Leora text
    font_main = get_font(30 * SCALE, bold=True)
    d.text((100 * SCALE, 45 * SCALE), "Leora", font=font_main, fill=(79, 70, 229, 255))

    return save(img, "logo_kanishka.png")

# ─────────────────────────────────────────
# 3. Autodesk (Karthick)
# Brand: black text, red icon
# ─────────────────────────────────────────
def make_autodesk():
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Red triangle icon
    pw = W * SCALE
    ph = H * SCALE
    pts = [
        (30 * SCALE, 85 * SCALE),
        (72 * SCALE, 85 * SCALE),
        (51 * SCALE, 35 * SCALE),
    ]
    d.polygon(pts, fill=(204, 0, 0, 255))

    # "AUTODESK" text
    font_main = get_font(28 * SCALE, bold=True)
    d.text((95 * SCALE, 50 * SCALE), "AUTODESK", font=font_main, fill=(15, 15, 15, 255))

    return save(img, "logo_karthick.png")

# ─────────────────────────────────────────
# 4. ServiceNow (Naveen)
# Brand: green #62D84E on dark BG, or green text
# ─────────────────────────────────────────
def make_servicenow():
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Green rounded rect icon
    icon_x, icon_y = 20 * SCALE, 22 * SCALE
    icon_w, icon_h = 68 * SCALE, 68 * SCALE
    d.rounded_rectangle(
        [icon_x, icon_y, icon_x + icon_w, icon_y + icon_h],
        radius=10 * SCALE, fill=(13, 159, 35, 255)
    )
    font_icon = get_font(22 * SCALE, bold=True)
    d.text((icon_x + icon_w // 2, icon_y + icon_h // 2), "SN",
           font=font_icon, fill=(255, 255, 255, 255), anchor="mm")

    font_main = get_font(22 * SCALE, bold=True)
    d.text((105 * SCALE, 35 * SCALE), "ServiceNow", font=font_main, fill=(15, 23, 42, 255))

    return save(img, "logo_naveen.png")

# ─────────────────────────────────────────
# 5. JusPay (Pradeep)
# Brand: blue/indigo
# ─────────────────────────────────────────
def make_juspay():
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Indigo pill icon
    icon_x, icon_y = 20 * SCALE, 28 * SCALE
    icon_w, icon_h = 68 * SCALE, 56 * SCALE
    d.rounded_rectangle(
        [icon_x, icon_y, icon_x + icon_w, icon_y + icon_h],
        radius=14 * SCALE, fill=(67, 56, 202, 255)
    )
    font_icon = get_font(20 * SCALE, bold=True)
    d.text((icon_x + icon_w // 2, icon_y + icon_h // 2), "JP",
           font=font_icon, fill=(255, 255, 255, 255), anchor="mm")

    font_main = get_font(28 * SCALE, bold=True)
    d.text((105 * SCALE, 42 * SCALE), "JusPay", font=font_main, fill=(67, 56, 202, 255))

    return save(img, "logo_pradeep.png")

# ─────────────────────────────────────────
# 6. Cooper (Janani)
# Brand: teal/dark
# ─────────────────────────────────────────
def make_cooper():
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Teal circle icon
    cx, cy, r = 55 * SCALE, 60 * SCALE, 32 * SCALE
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(20, 184, 166, 255))
    font_icon = get_font(22 * SCALE, bold=True)
    d.text((cx, cy), "Co", font=font_icon, fill=(255, 255, 255, 255), anchor="mm")

    font_main = get_font(30 * SCALE, bold=True)
    d.text((100 * SCALE, 45 * SCALE), "Cooper", font=font_main, fill=(15, 23, 42, 255))

    return save(img, "logo_janani.png")

# ─────────────────────────────────────────
# 7. Top MNC (KB Mohana Rajan)
# Generic premium badge
# ─────────────────────────────────────────
def make_top_mnc():
    img = make_canvas()
    d = ImageDraw.Draw(img)

    # Gold star icon
    cx, cy, r = 52 * SCALE, 60 * SCALE, 32 * SCALE
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(234, 179, 8, 255))
    font_icon = get_font(24 * SCALE, bold=True)
    d.text((cx, cy), "★", font=font_icon, fill=(255, 255, 255, 255), anchor="mm")

    font_main = get_font(26 * SCALE, bold=True)
    d.text((98 * SCALE, 38 * SCALE), "Top MNC", font=font_main, fill=(15, 23, 42, 255))
    font_sub = get_font(14 * SCALE)
    d.text((98 * SCALE, 72 * SCALE), "₹3 Crore Package", font=font_sub, fill=(100, 116, 139, 255))

    return save(img, "logo_kb_mohana_rajan.png")

if __name__ == "__main__":
    make_paloalto()
    make_leora()
    make_autodesk()
    make_servicenow()
    make_juspay()
    make_cooper()
    make_top_mnc()
    print("\nAll logos generated successfully!")
