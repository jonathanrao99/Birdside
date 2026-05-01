#!/usr/bin/env python3
"""
Regenerate product titles, meta descriptions, hero <p>, menu_desc blocks,
and hero image alt text for SEO, local (Katy TX), and crawlability.
Avoids colon and em/en dash in generated strings.
"""

from __future__ import annotations

import html as html_module
import json
import re
from html import escape as html_escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "content" / "generated" / "site-content.json"

# Full ingredient lines (source of truth). Menu JSON may be truncated; always prefer these for copy.
CANONICAL_SEEDS: dict[str, str] = {
    "the-sando": (
        "Crispy Nashville hot chicken tender with house-made slaw, pickles and Bird Sauce on a toasted bun"
    ),
    "the-sando-combo": (
        "Toasted Bun, Fried Tender, House-Made Slaw, Pickles, Bird Sauce. "
        "Combo includes choice of Fries or Mac and Cheese and One Bird Sauce"
    ),
    "the-basket": (
        "Fried Tenders with choice of Fries or Mac and Cheese and Bird Sauce"
    ),
    "the-loaded-fries": "Chopped Tenders, Seasoned Fries, Melted Cheese, Bird Sauce",
    "wing-5pc": (
        "5 Crispy Wings, Choice of One Flavor. Includes One House-Made Buttermilk Ranch"
    ),
    "wing-5pc-combo": (
        "5 Crispy Wings, Choice of One Flavor. "
        "Combo includes choice of Fries or Mac and Cheese and One House-Made Buttermilk Ranch"
    ),
    "wing-8pc": (
        "8 Crispy Wings, Choice of Two Flavors. Includes Two House-Made Buttermilk Ranch"
    ),
    "wing-8pc-combo": (
        "8 Crispy Wings, Choice of Two Flavors. "
        "Combo includes choice of Fries or Mac and Cheese and Two House-Made Buttermilk Ranch"
    ),
    "wing-12pc": (
        "12 Crispy Wings, Choice of Two Flavors. Includes Two House-Made Buttermilk Ranch"
    ),
    "wing-12pc-combo": (
        "12 Crispy Wings, Choice of Two Flavors. "
        "Combo includes choice of Fries or Mac and Cheese and Two House-Made Buttermilk Ranch"
    ),
    "the-wing-box": (
        "8 Crispy Wings, Choice of Two Flavors. "
        "Served with Fries, Mac and Cheese, and Two House-Made Buttermilk Ranch"
    ),
    "extra-tender": "Fried Tender with Choice of Heat Level",
    "garlic-parmesan-fries": (
        "Crispy fries tossed with garlic butter, parmesan, and herbs"
    ),
    "large-slaw": (
        "Shredded cabbage and carrots, mayonnaise, vinegar, sugar, salt, celery seed, black pepper"
    ),
    "french-fries": "House-Made Seasoned Fries",
    "maple-buffalo-ranch-fries": (
        "Seasoned Fries, Maple Buffalo Sauce, topped with house-made buttermilk ranch and chives"
    ),
    "creamy-mac-cheese": (
        "House-made creamy mac and cheese with a blend of three cheeses, paprika, and chives"
    ),
    "dipping-sauce": "Signature Bird Sauce or House-Made Buttermilk Ranch",
    "wing-sauce": "House-made wing sauce, five flavors to choose from",
    "calypso-lemonade": (
        "Lemonade made with real fruit, real sugar, lemon bits, and natural flavors"
    ),
    "soda": "Chilled fountain soda",
    "water": "Bottled water",
}


def parse_home_menu(html: str) -> dict[str, tuple[str, str]]:
    """slug -> (menu_name, menu_desc) from home page blocks."""
    out: dict[str, tuple[str, str]] = {}
    for part in html.split('<div class="menu_block-content">')[1:]:
        href_m = re.search(r'href="/product/([^"]+)"', part)
        if not href_m:
            continue
        slug = href_m.group(1)
        name_m = re.search(r'<h3 class="menu_name">([^<]+)</h3>', part)
        desc_m = re.search(r'<div class="menu_desc[^"]*">([^<]*)</div>', part)
        name = html_module.unescape(name_m.group(1).strip()) if name_m else slug
        desc = html_module.unescape(desc_m.group(1).strip()) if desc_m else ""
        out[slug] = (name, desc)
    return out


def slug_to_fallback_name(slug: str) -> str:
    special = {
        "brownie-a-la-mode": "Brownie à la mode",
        "muzzarela-sticks": "Mozzarella sticks",
        "calypso-lemonade": "Calypso Lemonade",
        "creamy-mac-cheese": "Creamy Mac and Cheese",
    }
    if slug in special:
        return special[slug]
    t = slug.replace("-", " ").title()
    t = re.sub(r"\bPc\b", "PC", t)
    return t


def strip_noise(text: str) -> str:
    t = text.replace("&amp;", " and ").replace("&", " and ")
    t = re.sub(r"\s+", " ", t).strip()
    return t


def ban_chars(s: str) -> str:
    """Normalize dashes; do not replace colons (breaks times and label patterns)."""
    s = s.replace("—", " ").replace("–", ", ")
    return re.sub(r"\s+", " ", s).strip()


DANGLING_LAST_WORDS = frozenset(
    {"at", "and", "or", "the", "of", "with", "for", "to", "in", "on", "by", "a", "an", "as"}
)


def strip_dangling_tail(s: str) -> str:
    s = s.strip().rstrip(",").strip()
    words = s.split()
    while words and words[-1].lower().rstrip(".") in DANGLING_LAST_WORDS:
        words.pop()
    out = " ".join(words).strip()
    if out.count("(") > out.count(")"):
        cut = out.rfind("(")
        if cut > 0:
            out = out[:cut].strip().rstrip(",").strip()
    return out


def truncate_smart(text: str, max_len: int) -> str:
    """Truncate on sentence or clause boundaries; avoid orphan words like 'at' from 'at Birdside'."""
    text = strip_noise(text)
    if len(text) <= max_len:
        return strip_dangling_tail(text)
    chunk = text[:max_len]
    dot = chunk.rfind(". ")
    if dot >= max(28, max_len // 4):
        return strip_dangling_tail(text[: dot + 1].strip())
    comma = chunk.rfind(", ")
    if comma >= max(28, max_len // 3):
        return strip_dangling_tail(text[:comma].strip())
    cut = chunk.rsplit(" ", 1)[0]
    return strip_dangling_tail(cut)


def strip_geo_suffix(text: str) -> str:
    """Avoid circular SEO text when menu lines already end with Birdside Katy."""
    prev = None
    while prev != text:
        prev = text
        text = re.sub(r"\s*at Birdside HTX in Katy\.?$", "", text, flags=re.I).strip()
    while " at at " in text:
        text = text.replace(" at at ", " at ")
    return text


def kind_label(slug: str, name: str, desc: str) -> str:
    blob = f"{slug} {name} {desc}".lower()
    if "lorem" in blob:
        return "Menu item"
    if "brownie" in blob or "pancake" in blob or "chocolate" in blob:
        return "Sweet treat"
    if "burger" in blob or "burger" in slug:
        return "Burger plate"
    if "hot-dog" in slug or "hot dog" in blob:
        return "Hot dog plate"
    if "nacho" in blob:
        return "Loaded nachos"
    if "nugget" in blob:
        return "Chicken nuggets"
    if "tuna" in blob:
        return "Sandwich plate"
    if "veggie" in blob:
        return "Plant-based burger"
    if "mozzarella" in blob or "muzzarela" in blob or "stick" in blob:
        return "Fried appetizer"
    if "onion" in blob:
        return "Fried side"
    if "orange" in blob or "juice" in blob:
        return "Cold drink"
    if "wing box" in blob:
        return "Wings box meal"
    if "combo" in blob and "wing" in blob:
        return "Wings combo meal"
    if "wing" in blob or "wings" in blob:
        return "Crispy chicken wings"
    if "sando" in blob or "sandwich" in blob or "bun" in blob:
        return "Nashville hot chicken sandwich"
    if "basket" in blob or "tender" in blob:
        return "Chicken tenders meal"
    if "loaded fries" in blob or "fries" in blob or "mac" in blob or "slaw" in blob:
        return "Side or extra"
    if (
        "lemonade" in blob
        or "soda" in blob
        or "water" in blob
        or "tea" in blob
        or "juice" in blob
    ):
        return "Cold drink"
    if "sauce" in blob:
        return "Sauce add-on"
    return "Birdside menu item"


def build_copy(slug: str, name: str, source: str) -> tuple[str, str, str, str]:
    """Returns title, meta, hero_p_plain, menu_short_plain"""
    src = strip_geo_suffix(ban_chars(strip_noise(source)))
    if slug in CANONICAL_SEEDS:
        src = ban_chars(CANONICAL_SEEDS[slug])
    if not src or "lorem ipsum" in src.lower():
        src = ban_chars(
            f"{name} on the Birdside HTX menu in Katy, Texas. "
            f"Pairs with wings, sandwiches, and house sides for Greater Houston diners."
        )

    kind = kind_label(slug, name, src)

    title = ban_chars(f"{name}, {kind} | Birdside HTX, Katy TX")

    lead = ban_chars(truncate_smart(src, 165))
    if re.search(r"birdside\s+htx.{0,48}katy", lead, re.I):
        meta = ban_chars(
            f"{name} at Birdside HTX in Katy. Order online for Greater Houston pickup or delivery."
        )
    else:
        meta = ban_chars(
            f"{name} at Birdside HTX in Katy. {lead}. "
            f"Order online for Greater Houston pickup or delivery."
        )
    if len(meta) > 320:
        meta = ban_chars(truncate_smart(meta, 317) + ".")

    hero_core = ban_chars(src.rstrip("."))
    hot_kinds = (
        "Nashville hot chicken sandwich",
        "Crispy chicken wings",
        "Wings combo meal",
        "Wings box meal",
        "Chicken tenders meal",
    )
    if len(hero_core) > 300:
        hero_core = truncate_smart(hero_core, 290)
    if kind in hot_kinds:
        hero = ban_chars(
            f"{hero_core}. Served by Birdside HTX in Katy with bold Nashville hot flavor. "
            f"Order online for pickup or delivery across Greater Houston."
        )
    else:
        hero = ban_chars(
            f"{hero_core}. Served by Birdside HTX in Katy. "
            f"Order online for pickup or delivery across Greater Houston."
        )
    if len(hero) > 420:
        hero = ban_chars(truncate_smart(hero, 417) + ".")

    menu_core = ban_chars(truncate_smart(src, 132))
    if re.search(r"birdside\s+htx", menu_core, re.I):
        menu_short = menu_core
    else:
        menu_short = ban_chars(f"{menu_core} at Birdside HTX in Katy.")
    if len(menu_short) > 145:
        tail = "" if re.search(r"birdside\s+htx", menu_core, re.I) else " at Birdside HTX in Katy."
        menu_short = ban_chars(truncate_smart(src, 95) + tail)

    return title, meta, hero, menu_short


def esc_amp(s: str) -> str:
    """Escape for HTML text nodes."""
    return html_escape(s, quote=False)


def replace_menu_desc(html: str, slug: str, new_plain: str) -> str:
    inner = esc_amp(new_plain)
    markers = (
        f'href="/product/{slug}"',
        f'href="../{slug}/index.html"',
    )
    parts = html.split('<div class="menu_block-content">')
    out: list[str] = [parts[0]]
    for chunk in parts[1:]:
        if any(m in chunk for m in markers):
            chunk = re.sub(
                r'<div class="menu_desc text-color-grey-300">[^<]*</div>',
                f'<div class="menu_desc text-color-grey-300">{inner}</div>',
                chunk,
                count=1,
            )
        out.append(chunk)
    return '<div class="menu_block-content">'.join(out)


def replace_hero_paragraph(html: str, new_plain: str) -> str:
    inner = esc_amp(new_plain)
    return re.sub(
        r"<p class=\"text-weight-medium\">[^<]*</p>",
        f'<p class="text-weight-medium">{inner}</p>',
        html,
        count=1,
    )


def replace_hero_img_alt(html: str, name_plain: str) -> str:
    """First product_image alt in document (hero)."""
    alt = esc_amp(f"{name_plain} at Birdside HTX, Katy")

    def repl(m):
        return m.group(1) + alt + m.group(3)

    return re.sub(
        r'(<img alt=")([^"]*)(" class="product_image")',
        repl,
        html,
        count=1,
    )


def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    home_html = data["routes"]["/"]["mainHtml"]
    menu_html = (data.get("global") or {}).get("ourMenuHtml") or ""
    menu_source = menu_html.strip() if menu_html.strip() else home_html
    menu_from_home = parse_home_menu(menu_source)

    all_slugs = sorted(set(data["products"].keys()))

    titles: dict[str, str] = {}
    metas: dict[str, str] = {}
    heroes: dict[str, str] = {}
    menus: dict[str, str] = {}

    for slug in all_slugs:
        if slug in menu_from_home:
            name, desc = menu_from_home[slug]
        else:
            name = slug_to_fallback_name(slug)
            desc = ""
        t, m, h, mu = build_copy(slug, name, desc)
        titles[slug] = t
        metas[slug] = m
        heroes[slug] = h
        menus[slug] = mu

    # Pass 1 — refresh every menu_desc block site-wide
    for bucket_name in ("routes", "products"):
        bucket = data.get(bucket_name, {})
        for key, entry in bucket.items():
            html = entry.get("mainHtml", "")
            if "menu_desc text-color-grey-300" not in html:
                continue
            for slug, plain in menus.items():
                html = replace_menu_desc(html, slug, plain)
            entry["mainHtml"] = html

    g = data.get("global")
    if g and "ourMenuHtml" in g and (g.get("ourMenuHtml") or "").strip():
        html = g["ourMenuHtml"]
        if "menu_desc text-color-grey-300" in html:
            for slug, plain in menus.items():
                html = replace_menu_desc(html, slug, plain)
            g["ourMenuHtml"] = html

    # Pass 2 — product entries get title, meta, hero p, img alt
    for slug in all_slugs:
        name_for_alt = menu_from_home.get(slug, (slug_to_fallback_name(slug), ""))[0]
        for bucket_name, path_key in (
            ("products", slug),
            ("routes", f"/product/{slug}"),
        ):
            entry = data.get(bucket_name, {}).get(path_key)
            if not entry:
                continue
            entry["title"] = titles[slug]
            entry["description"] = metas[slug]
            html = entry["mainHtml"]
            html = replace_hero_paragraph(html, heroes[slug])
            html = replace_hero_img_alt(html, name_for_alt)
            entry["mainHtml"] = html

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print(f"Updated {len(all_slugs)} products across routes and products buckets.")


if __name__ == "__main__":
    main()
