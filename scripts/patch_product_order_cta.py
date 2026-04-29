#!/usr/bin/env python3
"""Replace Webflow add-to-cart form with Square ORDER NOW link on all product pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Birdside HTX Square Online ordering
SQUARE_ORDER_URL = "https://birdsidehtx.square.site/"

CART_BLOCK = re.compile(
    r'<div class="product_cart-button"><form class="w-commerce-commerceaddtocartform[\s\S]*?'
    r"Product is not available in this quantity\.</div></div></div></div></div></div>"
    r'<div class="product_infos">'
)

REPLACEMENT = (
    '<div class="product_cart-button">'
    f'<a href="{SQUARE_ORDER_URL}" class="button yellow w-button" '
    'target="_blank" rel="noopener noreferrer">ORDER NOW</a>'
    "</div></div></div></div>"
    '<div class="product_infos">'
)


def main() -> None:
    n_files = 0
    for path in ROOT.rglob("*.html"):
        if "saveweb2zip" in str(path):
            continue
        if "/product/" not in str(path) or path.name != "index.html":
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        if "w-commerce-commerceaddtocartform" not in text:
            continue
        new_text, count = CART_BLOCK.subn(REPLACEMENT, text, count=1)
        if count != 1:
            raise RuntimeError(f"Expected 1 cart block in {path}, got {count}")
        path.write_text(new_text, encoding="utf-8")
        n_files += 1
    print(f"Patched ORDER NOW + removed quantity in {n_files} product pages.")


if __name__ == "__main__":
    main()
