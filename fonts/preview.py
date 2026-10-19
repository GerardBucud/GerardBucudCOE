import sys
from PIL import Image, ImageDraw, ImageFont
f = ImageFont.truetype(sys.argv[1], 90)
lines = ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ", "abcdefghijklm", "nopqrstuvwxyz", "0123456789", "!\"#$%&'()*+,-./:;", "<=>?@[\\]^_`{|}~", "Hello World 2026"]
img = Image.new('RGB', (1400, 130*len(lines)+40), 'white'); d = ImageDraw.Draw(img)
for i, l in enumerate(lines): d.text((30, 20+i*130), l, font=f, fill='black')
img.save(sys.argv[2])
