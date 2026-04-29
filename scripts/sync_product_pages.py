#!/usr/bin/env python3
"""Generate/update legacy product pages: slug, copy, image, weight, calories; sync 3 trees."""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "public/legacy/product/the-sando/index.html"
PRODUCT_ROOTS = [
    ROOT / "public/legacy/product",
    ROOT / "legacy-site/product",
    ROOT / "product",
]

# slug -> title (for h1/alt, may include &amp;), price str XX.XX, desc HTML for <p>, image, weight line, calories line
PRODUCTS: list[tuple[str, str, str, str, str, str, str]] = [
    (
        "the-sando",
        "The Sando",
        "15.99",
        "Toasted Bun, Fried Tender, House-Made Slaw, Pickles, Bird Sauce.",
        "/assets/menu-cover-sando.png",
        "420g (14.8oz)",
        "780 kcal",
    ),
    (
        "the-sando-combo",
        "The Sando Combo",
        "18.99",
        "Toasted Bun, Fried Tender, House-Made Slaw, Pickles, Bird Sauce. Combo includes choice of (Fries or Mac &amp; Cheese) and One Bird Sauce.",
        "/assets/THE%20SANDO%20COMBO.jpg",
        "620g (21.9oz)",
        "1120 kcal",
    ),
    (
        "the-basket",
        "The Basket",
        "17.99",
        "Fried Tenders with choice of (Fries or Mac &amp; Cheese) and Bird Sauce.",
        "/assets/Tenders%20cropped.png",
        "480g (16.9oz)",
        "940 kcal",
    ),
    (
        "the-loaded-fries",
        "The Loaded Fries",
        "15.99",
        "Chopped Tenders, Seasoned Fries, Melted Cheese, Bird Sauce.",
        "/assets/Loaded%20side%20fries%20chicken.jpg",
        "410g (14.5oz)",
        "790 kcal",
    ),
    (
        "wing-5pc",
        "5PC Wings",
        "12.99",
        "5 Crispy Wings, Choice of One Flavor. Includes One House-Made Buttermilk Ranch.",
        "/assets/THE%205%20PIECE.png",
        "220g (7.8oz)",
        "520 kcal",
    ),
    (
        "wing-5pc-combo",
        "5PC Wings Combo",
        "15.99",
        "5 Crispy Wings, Choice of One Flavor. Combo includes choice of (Fries or Mac &amp; Cheese) and One House-Made Buttermilk Ranch.",
        "/assets/THE%205%20PIECE%20COMBO.jpg",
        "480g (16.9oz)",
        "980 kcal",
    ),
    (
        "wing-8pc",
        "8PC Wings",
        "16.99",
        "8 Crispy Wings, Choice of Two Flavors. Includes Two House-Made Buttermilk Ranch.",
        "/assets/THE%208%20PIECE.jpg",
        "320g (11.3oz)",
        "720 kcal",
    ),
    (
        "wing-8pc-combo",
        "8PC Wings Combo",
        "19.99",
        "8 Crispy Wings, Choice of Two Flavors. Combo includes choice of (Fries or Mac &amp; Cheese) and Two House-Made Buttermilk Ranch.",
        "/assets/THE%208%20PIECE%20COMBO.jpeg",
        "580g (20.5oz)",
        "1180 kcal",
    ),
    (
        "wing-12pc",
        "12PC Wings",
        "23.99",
        "12 Crispy Wings, Choice of Two Flavors. Includes Two House-Made Buttermilk Ranch.",
        "/assets/THE%2012%20PIECE.jpg",
        "450g (15.9oz)",
        "980 kcal",
    ),
    (
        "wing-12pc-combo",
        "12PC Wings Combo",
        "25.99",
        "12 Crispy Wings, Choice of Two Flavors. Combo includes choice of (Fries or Mac &amp; Cheese) and Two House-Made Buttermilk Ranch.",
        "/assets/THE%2012%20PIECE%20COMBO.jpeg",
        "720g (25.4oz)",
        "1420 kcal",
    ),
    (
        "the-wing-box",
        "The Wing Box",
        "23.99",
        "8 Crispy Wings, Choice of Two Flavors. Served with Fries, Mac &amp; Cheese, and Two House-Made Buttermilk Ranch.",
        "/assets/11.jpg",
        "760g (26.8oz)",
        "1380 kcal",
    ),
    (
        "dipping-sauce",
        "Dipping Sauce",
        "0.99",
        "Signature Bird Sauce Or House-Made Buttermilk Ranch.",
        "/assets/Screenshot%202026-04-28%20at%208.37.03%E2%80%AFPM.png",
        "57g (2oz)",
        "90 kcal",
    ),
    (
        "extra-tender",
        "Extra Tender",
        "3.99",
        "Fried Tender with Choice of Heat Level.",
        "/assets/2.jpg",
        "125g (4.4oz)",
        "290 kcal",
    ),
    (
        "french-fries",
        "Seasoned Fries",
        "5.99",
        "House-Made Seasoned Fries.",
        "/assets/Screenshot%202026-04-28%20at%208.42.37%E2%80%AFPM.png",
        "170g (6oz)",
        "420 kcal",
    ),
    (
        "garlic-parmesan-fries",
        "Garlic Parmesan Fries",
        "7.99",
        "Seasoned Fries, Fresh Garlic Butter, Topped with Parmesan Cheese and Chives.",
        "/assets/9.jpg",
        "240g (8.5oz)",
        "640 kcal",
    ),
    (
        "large-slaw",
        "Large Slaw",
        "5.99",
        "Shredded Cabbage and Carrots, Mayonnaise, Vinegar, Sugar, Salt, Celery Seed, Black pepper.",
        "/assets/Screenshot%202026-04-28%20at%208.41.10%E2%80%AFPM.png",
        "200g (7.1oz)",
        "180 kcal",
    ),
    (
        "creamy-mac-cheese",
        "Creamy Mac &amp; Cheese",
        "5.99",
        "House-made Creamy Mac &amp; Cheese made with a Blend of Three Cheeses. Topped with Paprika and Chives.",
        "/assets/Mac_and_cheese.jpg",
        "220g (7.8oz)",
        "480 kcal",
    ),
    (
        "wing-sauce",
        "Wing Sauce",
        "1.29",
        "House-Made Wing Sauce (5 Wing Sauce to Choose From).",
        "/assets/Screenshot%202026-04-28%20at%208.31.10%E2%80%AFPM.png",
        "43g (1.5oz)",
        "50 kcal",
    ),
    (
        "maple-buffalo-ranch-fries",
        "Maple Buffalo Ranch Fries",
        "7.99",
        "Seasoned Fries, Maple Buffalo Sauce, Topped with House-made Buttermilk Ranch and Chives.",
        "/assets/MAPLE%20BUFFALO%20RANCH%20FRIES.jpg",
        "260g (9.2oz)",
        "690 kcal",
    ),
    (
        "calypso-lemonade",
        "Calypso Lemonade",
        "3.99",
        "Refreshingly Delicious Lemonade Made with Real Fruit, Real Sugar, Lemon Bits and Natural Flavors.",
        "/assets/VDV06465.jpg",
        "540g (19oz)",
        "160 kcal",
    ),
    (
        "soda",
        "Soda",
        "2.49",
        "Chilled fountain soda.",
        "/assets/VDV06487.jpg",
        "540g (19oz)",
        "190 kcal",
    ),
    (
        "water",
        "Water",
        "1.79",
        "Bottled water.",
        "/assets/20411_-3__67398.webp",
        "500g (17.6oz)",
        "0 kcal",
    ),
]


def meta_attr(s: str) -> str:
    return html.escape(html.unescape(s), quote=True)


def patch_html(content: str, spec: tuple[str, str, str, str, str, str, str]) -> str:
    slug, title_html, price, desc_html, img, weight, cal = spec
    c = content
    c = re.sub(r'data-wf-item-slug="[^"]+"', f'data-wf-item-slug="{slug}"', c, count=1)
    plain_title = html.unescape(re.sub(r"<[^>]+>", "", title_html))
    c = re.sub(r"<title>[^<]*</title>", f"<title>{meta_attr(plain_title)} - Birdside</title>", c, count=1)
    c = re.sub(
        r'<meta content="[^"]*" name="description"/>',
        f'<meta content="{meta_attr(html.unescape(desc_html))}" name="description"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<meta content="[^"]*" property="og:title"/>',
        f'<meta content="{meta_attr(plain_title)}" property="og:title"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<meta content="[^"]*" property="og:description"/>',
        f'<meta content="{meta_attr(html.unescape(desc_html))}" property="og:description"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<meta content="[^"]*" property="og:image"/>',
        f'<meta content="{meta_attr(img)}" property="og:image"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<meta content="[^"]*" property="twitter:title"/>',
        f'<meta content="{meta_attr(plain_title)}" property="twitter:title"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<meta content="[^"]*" property="twitter:description"/>',
        f'<meta content="{meta_attr(html.unescape(desc_html))}" property="twitter:description"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<meta content="[^"]*" property="twitter:image"/>',
        f'<meta content="{meta_attr(img)}" property="twitter:image"/>',
        c,
        count=1,
    )
    c = re.sub(
        r'<h1 class="heading-style-h3">[^<]*</h1>',
        f'<h1 class="heading-style-h3">{title_html}</h1>',
        c,
        count=1,
    )
    c = re.sub(
        r'(<div class="shop-list_price"[^>]*>)[^<]*(</div>)',
        rf"\g<1>${price}\g<2>",
        c,
        count=1,
    )
    c = re.sub(
        r'(<p class="text-weight-medium">)([^<]*)(</p>)',
        rf"\g<1>{desc_html}\g<3>",
        c,
        count=1,
    )
    c = re.sub(
        r"(Product weight</div><div class=\"product_info-description\">)[^<]*(</div></div><div class=\"product_info\"><div class=\"product_info-detail\">Caloric value)",
        rf"\g<1>{weight}\g<2>",
        c,
        count=1,
    )
    c = re.sub(
        r"(Caloric value</div><div class=\"product_info-description\">)[^<]*(</div></div></div>)",
        rf"\g<1>{cal}\g<2>",
        c,
        count=1,
    )
    plain_alt = html.unescape(re.sub(r"<[^>]+>", "", title_html))
    c = re.sub(
        r'<img alt="[^"]*" class="product_image"[^>]*>',
        f'<img alt="{meta_attr(plain_alt)}" class="product_image" loading="lazy" sizes="100vw" src="{img}"/>',
        c,
        count=1,
    )
    return c


def write_all_products() -> None:
    template = TEMPLATE.read_text(encoding="utf-8")
    for root in PRODUCT_ROOTS:
        for spec in PRODUCTS:
            slug = spec[0]
            path = root / slug / "index.html"
            path.parent.mkdir(parents=True, exist_ok=True)
            if path.exists():
                raw = path.read_text(encoding="utf-8")
            else:
                raw = template
            path.write_text(patch_html(raw, spec), encoding="utf-8")


def main() -> None:
    if not TEMPLATE.is_file():
        raise SystemExit(f"Missing template: {TEMPLATE}")
    write_all_products()
    print(f"Synced {len(PRODUCTS)} products x {len(PRODUCT_ROOTS)} locations.")


if __name__ == "__main__":
    main()
