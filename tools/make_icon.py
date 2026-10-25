"""Рисует icon.ico: угловые скобки кода и кнопка play в цветах One Dark.

Каждый размер рисуется отдельно (с запасом по разрешению и сглаживанием),
а на мелких размерах линии толще, чтобы значок читался в панели задач.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SIZES = [16, 20, 24, 32, 40, 48, 64, 128, 256]

BG_TOP = (50, 56, 68)
BG_BOTTOM = (33, 37, 43)
OUTLINE = (24, 26, 31)
PURPLE = (198, 120, 221)
BLUE = (97, 175, 239)


def render(size):
    ss = 8 if size <= 48 else 4
    px = size * ss
    k = px / 256  # всё ниже задано в сетке 256×256

    img = Image.new('RGBA', (px, px), (0, 0, 0, 0))

    # плашка с вертикальным градиентом
    margin = (6 if size <= 32 else 12) * k
    radius = (44 if size <= 32 else 52) * k
    box = [margin, margin, px - margin, px - margin]
    gradient = Image.new('RGBA', (px, px))
    gd = ImageDraw.Draw(gradient)
    for y in range(px):
        t = y / (px - 1)
        gd.line([(0, y), (px, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOTTOM)))
    mask = Image.new('L', (px, px), 0)
    ImageDraw.Draw(mask).rounded_rectangle(box, radius, fill=255)
    img.paste(gradient, (0, 0), mask)
    d = ImageDraw.Draw(img)
    if size >= 32:
        d.rounded_rectangle(box, radius, outline=OUTLINE, width=max(1, round(2 * k)))

    # скобки ‹ ›: на мелких размерах толще
    stroke = max(20, 1.9 * 256 / size) * k
    spread = 56 if size > 24 else 60

    def bracket(points):
        pts = [(x * k, y * k) for x, y in points]
        d.line(pts, fill=PURPLE, width=round(stroke), joint='curve')
        r = stroke / 2
        for x, y in (pts[0], pts[-1]):
            d.ellipse([x - r, y - r, x + r, y + r], fill=PURPLE)

    bracket([(96, 128 - spread), (52, 128), (96, 128 + spread)])
    bracket([(160, 128 - spread), (204, 128), (160, 128 + spread)])

    # треугольник play со скруглёнными углами
    tri = [(114 * k, 92 * k), (114 * k, 164 * k), (168 * k, 128 * k)]
    d.polygon(tri, fill=BLUE)
    d.line(tri + [tri[0]], fill=BLUE, width=round(14 * k), joint='curve')
    r = 7 * k
    for x, y in tri:
        d.ellipse([x - r, y - r, x + r, y + r], fill=BLUE)

    return img.resize((size, size), Image.LANCZOS)


# Кнопки на превью окна в панели задач: светлые значки для тёмной панели и тёмные для светлой.
GLYPH_SIZES = [16, 20, 24, 32, 40, 48]
GLYPH_COLORS = {'white': (240, 240, 240), 'black': (32, 32, 32)}


def render_glyph(name, size, color):
    ss = 8
    px = size * ss
    k = px / 24  # сетка 24×24, как у иконок интерфейса
    img = Image.new('RGBA', (px, px), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    def triangle(base, tip, y0=5.5, y1=18.5):
        d.polygon([(base * k, y0 * k), (base * k, y1 * k), (tip * k, 12 * k)], fill=color)

    def bar(x, w=2.6, y0=5.5, y1=18.5):
        d.rounded_rectangle([x * k, y0 * k, (x + w) * k, y1 * k], radius=0.9 * k, fill=color)

    if name == 'play':
        triangle(7, 19)
    elif name == 'pause':
        bar(6.5, 3.6)
        bar(13.9, 3.6)
    elif name == 'prev':
        bar(5)
        triangle(19, 8.5)
    elif name == 'next':
        triangle(5, 15.5)
        bar(16.4)
    return img.resize((size, size), Image.LANCZOS)


def make_taskbar_icons():
    for variant, color in GLYPH_COLORS.items():
        folder = ROOT / 'assets' / 'taskbar' / variant
        folder.mkdir(parents=True, exist_ok=True)
        for name in ('prev', 'play', 'pause', 'next'):
            images = [render_glyph(name, s, color) for s in GLYPH_SIZES]
            images[-1].save(folder / f'{name}.ico', format='ICO',
                            sizes=[(s, s) for s in GLYPH_SIZES], append_images=images[:-1])
    print('taskbar icons:', ROOT / 'assets' / 'taskbar')


def main():
    images = [render(s) for s in SIZES]
    out = ROOT / 'icon.ico'
    images[-1].save(out, format='ICO', sizes=[(s, s) for s in SIZES], append_images=images[:-1])
    print('icon:', out)
    make_taskbar_icons()

    # превью для проверки на светлом и тёмном фоне: python tools/make_icon.py preview.png
    if len(sys.argv) > 1:
        shown = [16, 24, 32, 48, 64, 128, 256]
        w = sum(shown) + 24 * (len(shown) + 1)
        sheet = Image.new('RGB', (w, 2 * (256 + 48)), (40, 44, 52))
        ImageDraw.Draw(sheet).rectangle([0, 256 + 48, w, 2 * (256 + 48)], fill=(240, 240, 240))
        for row in range(2):
            x = 24
            for s in shown:
                icon = images[SIZES.index(s)]
                sheet.paste(icon, (x, row * (256 + 48) + 24 + 256 - s), icon)
                x += s + 24
        sheet.save(sys.argv[1])
        print('preview:', sys.argv[1])


if __name__ == '__main__':
    main()
