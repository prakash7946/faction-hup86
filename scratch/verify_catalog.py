import os
import re
from collections import Counter

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

images = re.findall(r'image:\s*"([^"]+)"', text)
print(f"Total products in script.js: {len(images)}")

missing_images = []
for img in images:
    filepath = os.path.join(r'd:\april-86', img.replace('/', os.sep))
    if not os.path.exists(filepath):
        missing_images.append(img)

if missing_images:
    print("MISSING IMAGES:", missing_images)
else:
    print("SUCCESS: Every single product image file exists on disk!")

categories = re.findall(r'category:\s*"([^"]+)"', text)
print("\nProduct Counts by Category:")
for cat, count in Counter(categories).most_common():
    print(f"  • {cat.capitalize()}: {count} products")
