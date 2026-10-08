import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs("assets", exist_ok=True)

def create_gradient_bg(width, height, color1, color2, color3=None):
    base = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(base)
    for y in range(height):
        t = y / float(height)
        if color3 is None:
            r = int(color1[0] * (1 - t) + color2[0] * t)
            g = int(color1[1] * (1 - t) + color2[1] * t)
            b = int(color1[2] * (1 - t) + color2[2] * t)
        else:
            if t < 0.5:
                t2 = t * 2.0
                r = int(color1[0] * (1 - t2) + color2[0] * t2)
                g = int(color1[1] * (1 - t2) + color2[1] * t2)
                b = int(color1[2] * (1 - t2) + color2[2] * t2)
            else:
                t2 = (t - 0.5) * 2.0
                r = int(color2[0] * (1 - t2) + color3[0] * t2)
                g = int(color2[1] * (1 - t2) + color3[1] * t2)
                b = int(color2[2] * (1 - t2) + color3[2] * t2)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    return base

def draw_heart(draw, cx, cy, size, fill_color):
    points = []
    for step in range(0, 360, 5):
        t = math.radians(step)
        # Heart equation
        x = 16 * (math.sin(t) ** 3)
        y = -(13 * math.cos(t) - 5 * math.cos(2*t) - 2 * math.cos(3*t) - math.cos(4*t))
        px = cx + (x * size / 16.0)
        py = cy + (y * size / 16.0)
        points.append((px, py))
    draw.polygon(points, fill=fill_color)

def draw_star(draw, cx, cy, radius, fill_color):
    points = []
    for i in range(8):
        angle = i * math.pi / 4
        r = radius if i % 2 == 0 else radius * 0.35
        px = cx + r * math.cos(angle)
        py = cy + r * math.sin(angle)
        points.append((px, py))
    draw.polygon(points, fill=fill_color)

def draw_bear(draw, x, y, scale=1.0):
    # Brown Teddy Bear
    # Head
    head_r = int(45 * scale)
    hx, hy = x, y - int(20 * scale)
    # Ears
    ear_r = int(18 * scale)
    draw.ellipse([hx - int(40*scale), hy - int(45*scale), hx - int(40*scale) + ear_r*2, hy - int(45*scale) + ear_r*2], fill="#8D5B4C")
    draw.ellipse([hx + int(4*scale), hy - int(45*scale), hx + int(4*scale) + ear_r*2, hy - int(45*scale) + ear_r*2], fill="#8D5B4C")
    # Inner ears
    draw.ellipse([hx - int(34*scale), hy - int(39*scale), hx - int(34*scale) + int(ear_r*1.3), hy - int(39*scale) + int(ear_r*1.3)], fill="#D29985")
    draw.ellipse([hx + int(10*scale), hy - int(39*scale), hx + int(10*scale) + int(ear_r*1.3), hy - int(39*scale) + int(ear_r*1.3)], fill="#D29985")
    # Body
    draw.ellipse([hx - int(40*scale), y - int(5*scale), hx + int(40*scale), y + int(70*scale)], fill="#8D5B4C")
    # Head circle
    draw.ellipse([hx - head_r, hy - head_r, hx + head_r, hy + head_r], fill="#8D5B4C")
    # Snout
    snout_w, snout_h = int(24 * scale), int(18 * scale)
    draw.ellipse([hx - snout_w, hy + int(2*scale), hx + snout_w, hy + int(2*scale) + snout_h*2], fill="#F0DFD5")
    # Nose
    draw.ellipse([hx - int(5*scale), hy + int(8*scale), hx + int(5*scale), hy + int(15*scale)], fill="#3B231B")
    # Mouth
    draw.arc([hx - int(6*scale), hy + int(13*scale), hx + int(6*scale), hy + int(22*scale)], start=0, end=180, fill="#3B231B", width=max(1, int(2*scale)))
    # Eyes
    draw.ellipse([hx - int(24*scale), hy - int(4*scale), hx - int(14*scale), hy + int(6*scale)], fill="#231612")
    draw.ellipse([hx + int(14*scale), hy - int(4*scale), hx + int(24*scale), hy + int(6*scale)], fill="#231612")
    # Eye highlights
    draw.ellipse([hx - int(22*scale), hy - int(3*scale), hx - int(18*scale), hy + int(1*scale)], fill="#FFFFFF")
    draw.ellipse([hx + int(16*scale), hy - int(3*scale), hx + int(20*scale), hy + int(1*scale)], fill="#FFFFFF")
    # Cheeks
    draw.ellipse([hx - int(38*scale), hy + int(6*scale), hx - int(20*scale), hy + int(20*scale)], fill="#FFAAA6")
    draw.ellipse([hx + int(20*scale), hy + int(6*scale), hx + int(38*scale), hy + int(20*scale)], fill="#FFAAA6")
    # Feet
    draw.ellipse([hx - int(35*scale), y + int(55*scale), hx - int(5*scale), y + int(75*scale)], fill="#7A4E41")
    draw.ellipse([hx + int(5*scale), y + int(55*scale), hx + int(35*scale), y + int(75*scale)], fill="#7A4E41")

def draw_bunny(draw, x, y, scale=1.0):
    # White Bunny
    hx, hy = x, y - int(20 * scale)
    head_r = int(42 * scale)
    # Long Ears
    ear_w = int(14 * scale)
    ear_h = int(50 * scale)
    draw.ellipse([hx - int(28*scale), hy - ear_h - int(15*scale), hx - int(28*scale) + ear_w*2, hy - int(5*scale)], fill="#FFFFFF")
    draw.ellipse([hx + int(4*scale), hy - ear_h - int(15*scale), hx + int(4*scale) + ear_w*2, hy - int(5*scale)], fill="#FFFFFF")
    # Inner pink ears
    draw.ellipse([hx - int(23*scale), hy - ear_h - int(10*scale), hx - int(23*scale) + int(ear_w*1.3), hy - int(10*scale)], fill="#FFD1DC")
    draw.ellipse([hx + int(9*scale), hy - ear_h - int(10*scale), hx + int(9*scale) + int(ear_w*1.3), hy - int(10*scale)], fill="#FFD1DC")
    # Little pink flower/bow on ear
    draw_heart(draw, hx + int(28*scale), hy - int(28*scale), int(8*scale), "#FF85A1")
    # Body
    draw.ellipse([hx - int(36*scale), y - int(5*scale), hx + int(36*scale), y + int(68*scale)], fill="#FCFCFD")
    # Head circle
    draw.ellipse([hx - head_r, hy - head_r, hx + head_r, hy + head_r], fill="#FCFCFD")
    # Eyes
    draw.ellipse([hx - int(22*scale), hy - int(2*scale), hx - int(12*scale), hy + int(8*scale)], fill="#2B2024")
    draw.ellipse([hx + int(12*scale), hy - int(2*scale), hx + int(22*scale), hy + int(8*scale)], fill="#2B2024")
    # Eye highlights
    draw.ellipse([hx - int(20*scale), hy - int(1*scale), hx - int(16*scale), hy + int(3*scale)], fill="#FFFFFF")
    draw.ellipse([hx + int(14*scale), hy - int(1*scale), hx + int(18*scale), hy + int(3*scale)], fill="#FFFFFF")
    # Nose/mouth
    draw.ellipse([hx - int(3*scale), hy + int(8*scale), hx + int(3*scale), hy + int(13*scale)], fill="#FF8DA1")
    draw.arc([hx - int(5*scale), hy + int(11*scale), hx + int(5*scale), hy + int(18*scale)], start=0, end=180, fill="#FF8DA1", width=max(1, int(2*scale)))
    # Rosy Cheeks
    draw.ellipse([hx - int(35*scale), hy + int(8*scale), hx - int(18*scale), hy + int(20*scale)], fill="#FFB7C5")
    draw.ellipse([hx + int(18*scale), hy + int(8*scale), hx + int(35*scale), hy + int(20*scale)], fill="#FFB7C5")
    # Feet
    draw.ellipse([hx - int(32*scale), y + int(54*scale), hx - int(6*scale), y + int(72*scale)], fill="#F0EFF4")
    draw.ellipse([hx + int(6*scale), y + int(54*scale), hx + int(32*scale), y + int(72*scale)], fill="#F0EFF4")

# 1. Background image
print("Creating assets/background.jpg...")
bg = create_gradient_bg(1920, 1080, (255, 235, 240), (255, 218, 230), (242, 222, 248))
bg_draw = ImageDraw.Draw(bg)
# Subtle romantic soft glowing orbs
for cx, cy, r, fill in [(300, 200, 180, (255, 255, 255, 60)), (1600, 300, 220, (255, 240, 245, 70)), (960, 800, 250, (255, 220, 235, 50))]:
    bg_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)
for cx, cy, sz in [(400, 450, 22), (1450, 600, 18), (850, 250, 15), (1200, 850, 20), (200, 800, 16), (1700, 850, 25)]:
    draw_heart(bg_draw, cx, cy, sz, (255, 140, 170, 70))
bg.convert("RGB").save("assets/background.jpg", quality=95)

# 2. Sunset image
print("Creating assets/sunset.jpg...")
sunset = create_gradient_bg(1920, 1080, (58, 28, 62), (224, 86, 96), (255, 180, 110))
sunset_draw = ImageDraw.Draw(sunset)
# Glowing Sun
sun_x, sun_y = 960, 620
for r, alpha in [(300, 30), (200, 60), (120, 120), (70, 220)]:
    sunset_draw.ellipse([sun_x - r, sun_y - r, sun_x + r, sun_y + r], fill=(255, 230, 180, alpha))
# Distant rolling hills
sunset_draw.chord([ -200, 700, 1200, 1400 ], 180, 360, fill=(120, 50, 80, 200))
sunset_draw.chord([ 800, 680, 2200, 1400 ], 180, 360, fill=(100, 40, 70, 230))
# Foreground hill & romantic path
sunset_draw.chord([ -100, 780, 2020, 1600 ], 180, 360, fill=(70, 30, 55, 255))
# Path
path_pts = [(960, 660), (940, 760), (900, 880), (860, 1080), (1060, 1080), (1010, 880), (980, 760)]
sunset_draw.polygon(path_pts, fill=(180, 95, 110, 180))
sunset.convert("RGB").save("assets/sunset.jpg", quality=95)

# 3. Couple PNG
print("Creating assets/couple.png...")
couple_img = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
couple_draw = ImageDraw.Draw(couple_img)
# Soft glow behind couple
for r in range(250, 50, -20):
    couple_draw.ellipse([400 - r, 420 - r, 400 + r, 420 + r], fill=(255, 215, 230, 15))
# Draw Bear & Bunny
draw_bear(couple_draw, 310, 430, scale=2.1)
draw_bunny(couple_draw, 490, 440, scale=2.0)
# Glowing Heart between them
draw_heart(couple_draw, 400, 390, 40, (255, 95, 135, 240))
draw_heart(couple_draw, 400, 390, 25, (255, 180, 200, 240))
# Sparkles
for sx, sy in [(220, 260), (580, 240), (400, 220), (190, 480), (610, 460)]:
    draw_star(couple_draw, sx, sy, 14, (255, 230, 150, 220))
couple_img.save("assets/couple.png")

# 4. Cake PNG
print("Creating assets/cake.png...")
cake_img = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
cake_draw = ImageDraw.Draw(cake_img)
# Golden cake stand
cake_draw.ellipse([260, 600, 540, 660], fill="#E8D5B5")
cake_draw.rectangle([370, 630, 430, 700], fill="#D8C3A0")
cake_draw.ellipse([290, 680, 510, 720], fill="#E8D5B5")
# Chocolate cake base tier
cake_draw.chord([250, 440, 550, 610], 0, 180, fill="#3D2015")
cake_draw.ellipse([250, 410, 550, 490], fill="#4E2A1C")
# Cream frosting layer
cake_draw.ellipse([270, 380, 530, 440], fill="#FFF6EB")
# Chocolate dripping top tier
cake_draw.chord([270, 360, 530, 490], 0, 180, fill="#3A1D12")
cake_draw.ellipse([270, 330, 530, 410], fill="#4A2518")
# Whipped cream rosettes
for cx in [300, 350, 400, 450, 500]:
    cake_draw.ellipse([cx - 20, 340, cx + 20, 375], fill="#FFFFFF")
    cake_draw.ellipse([cx - 14, 345, cx + 14, 370], fill="#FFF2E2")
# Red Strawberries
for sx, sy in [(330, 345), (400, 335), (470, 345)]:
    draw_heart(cake_draw, sx, sy, 18, "#E63946")
    cake_draw.ellipse([sx - 4, sy - 10, sx + 4, sy - 5], fill="#2A9D8F") # green leaf
# Birthday Candle
cake_draw.rectangle([394, 250, 406, 335], fill="#FFE5D9")
# Stripes on candle
for cy in [265, 285, 305]:
    cake_draw.line([(394, cy), (406, cy + 5)], fill="#FF85A1", width=3)
# Candle flame & glow
for fr, fa in [(45, 40), (30, 90), (18, 180)]:
    cake_draw.ellipse([400 - fr, 230 - fr, 400 + fr, 230 + fr], fill=(255, 210, 90, fa))
draw_heart(cake_draw, 400, 225, 14, "#FFAA00")
draw_heart(cake_draw, 400, 228, 8, "#FFFFFF")
cake_img.save("assets/cake.png")

# 5. Memory 1-4 Images
memories_data = [
    ("assets/memory1.jpg", "The Day Our Story Began", "Every beautiful journey begins with a spark.", (255, 220, 230), (255, 180, 200)),
    ("assets/memory2.jpg", "Sweet Adventures & Laughter", "With you, every small moment is an adventure.", (220, 235, 255), (190, 210, 250)),
    ("assets/memory3.jpg", "Our Cozy Everyday Magic", "Safe, warm, and endlessly in love.", (255, 235, 215), (255, 205, 180)),
    ("assets/memory4.jpg", "Every Year Loving You More", "You are my favorite chapter and my forever home.", (245, 220, 255), (225, 185, 245))
]

for idx, (path, title, subtitle, c1, c2) in enumerate(memories_data, start=1):
    print(f"Creating {path}...")
    m_img = create_gradient_bg(1200, 800, c1, c2, (255, 250, 250))
    m_draw = ImageDraw.Draw(m_img)
    # Elegant border frame
    m_draw.rectangle([40, 40, 1160, 760], outline=(255, 255, 255, 200), width=4)
    m_draw.rectangle([55, 55, 1145, 745], outline=(255, 180, 200, 120), width=2)
    # Background floating hearts
    for hx, hy, hs in [(200, 180, 30), (1000, 220, 25), (300, 620, 22), (950, 600, 35), (600, 160, 18)]:
        draw_heart(m_draw, hx, hy, hs, (255, 255, 255, 90))
    # Couple in the center of memory
    if idx == 1:
        # Sweet first meet / tea date
        draw_bear(m_draw, 520, 450, scale=1.9)
        draw_bunny(m_draw, 680, 460, scale=1.8)
        draw_heart(m_draw, 600, 380, 35, "#FF6B8B")
    elif idx == 2:
        # Picnic / flowers
        draw_bear(m_draw, 510, 440, scale=1.9)
        draw_bunny(m_draw, 690, 450, scale=1.8)
        for fx in [420, 470, 730, 780]:
            draw_star(m_draw, fx, 540, 16, "#FFD166")
    elif idx == 3:
        # Cozy blanket hugs
        draw_bear(m_draw, 550, 450, scale=1.9)
        draw_bunny(m_draw, 640, 450, scale=1.8)
        draw_heart(m_draw, 600, 360, 40, "#FF85A1")
    else:
        # Stargazing / birthday wish
        draw_bear(m_draw, 530, 450, scale=1.9)
        draw_bunny(m_draw, 670, 450, scale=1.8)
        for sx, sy in [(500, 260), (600, 210), (700, 250), (420, 340), (780, 330)]:
            draw_star(m_draw, sx, sy, 18, "#FFE066")

    m_img.convert("RGB").save(path, quality=95)

# 6. Audio melody WAV (Sweet music box tune)
print("Creating assets/birthday-music.wav...")
import wave, struct

sample_rate = 22050
duration_secs = 16
num_samples = sample_rate * duration_secs

# Melody notes for "Happy Birthday / Romantic Lullaby"
# C4, D4, E4, F4, G4, A4, B4, C5
notes = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00,
    'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
    'G5': 783.99, 'REST': 0
}
melody = [
    ('G4', 0.5), ('G4', 0.5), ('A4', 1.0), ('G4', 1.0), ('C5', 1.0), ('B4', 2.0),
    ('G4', 0.5), ('G4', 0.5), ('A4', 1.0), ('G4', 1.0), ('D5', 1.0), ('C5', 2.0),
    ('G4', 0.5), ('G4', 0.5), ('G5', 1.0), ('E5', 1.0), ('C5', 1.0), ('B4', 1.0), ('A4', 1.5),
    ('F5', 0.5), ('F5', 0.5), ('E5', 1.0), ('C5', 1.0), ('D5', 1.0), ('C5', 2.5)
]

audio_data = []
current_sample = 0

for note_name, beats in melody:
    freq = notes.get(note_name, 0)
    note_duration = beats * 0.55 # seconds per beat
    note_samples = int(note_duration * sample_rate)
    for i in range(note_samples):
        if freq == 0:
            val = 0
        else:
            t = i / sample_rate
            # Music box chime envelope: fast attack, exponential decay with harmonics
            decay = math.exp(-3.5 * t)
            wave_val = (
                0.6 * math.sin(2 * math.pi * freq * t) +
                0.25 * math.sin(2 * math.pi * freq * 2 * t) +
                0.15 * math.sin(2 * math.pi * freq * 3 * t)
            ) * decay
            val = int(wave_val * 14000)
        audio_data.append(val)

with wave.open("assets/birthday-music.wav", "w") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)
    for sample in audio_data:
        wav_file.writeframes(struct.pack("<h", max(-32767, min(32767, sample))))

# Also create placeholder assets/birthday-music.mp3
# Copying WAV to mp3 name so if any browser treats wav data as playable it works, plus we provide HTML5 audio + Web Audio synthesizer fallback!
with open("assets/birthday-music.mp3", "wb") as f_mp3:
    with open("assets/birthday-music.wav", "rb") as f_wav:
        f_mp3.write(f_wav.read())

print("All assets successfully built!")
