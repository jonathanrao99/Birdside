#!/usr/bin/env python3
"""Hoist home `section_home-menu` into global.ourMenuHtml, dedupe product + /menu HTML."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "content" / "generated" / "site-content.json"

HOME_MENU_PREFIX = '<section class="section_home-menu"'
OUR_MENU_SLOT = "<!--our-menu-slot-->"
MENU_ROUTE_PREFIX = '<section class="section_menu">'


def section_bounds_end(html: str, start: int) -> int:
    depth = 0
    i = start
    while i < len(html):
        if html.startswith("<section", i):
            depth += 1
            gt = html.find(">", i)
            i = len(html) if gt < 0 else gt + 1
            continue
        if html.startswith("</section>", i):
            depth -= 1
            i += 10
            if depth == 0:
                return i
            continue
        i += 1
    raise RuntimeError("unclosed section")


def extract_home_menu(html: str) -> tuple[str, int, int]:
    start = html.find(HOME_MENU_PREFIX)
    if start < 0:
        raise RuntimeError("home route missing section_home-menu")
    end = section_bounds_end(html, start)
    return html[start:end], start, end


def strip_product_menu(html: str) -> str:
    prod = html.find('<section class="section_product">')
    if prod < 0:
        return html
    close_p = html.find("</section>", prod)
    if close_p < 0:
        return html
    menu_open = html.find("<section>", close_p)
    if menu_open < 0:
        return html
    try:
        menu_end = section_bounds_end(html, menu_open)
    except RuntimeError:
        return html
    return html[:menu_open] + html[menu_end:]


def strip_menu_route_section(html: str) -> str:
    start = html.find(MENU_ROUTE_PREFIX)
    if start < 0:
        return html
    try:
        end = section_bounds_end(html, start)
    except RuntimeError:
        return html
    return html[:start] + html[end:]


def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    home = data["routes"]["/"]["mainHtml"]
    data.setdefault("global", {})

    if HOME_MENU_PREFIX in home:
        menu_html, m_start, m_end = extract_home_menu(home)
        data["global"]["ourMenuHtml"] = menu_html
        if OUR_MENU_SLOT not in home:
            home = home[:m_start] + OUR_MENU_SLOT + home[m_end:]
        data["routes"]["/"]["mainHtml"] = home
    elif not (data["global"].get("ourMenuHtml") or "").strip():
        raise RuntimeError(
            "Home has no section_home-menu and global.ourMenuHtml is empty — restore home HTML or set ourMenuHtml."
        )

    entry_menu = data["routes"].get("/menu")
    if entry_menu and entry_menu.get("mainHtml"):
        entry_menu["mainHtml"] = strip_menu_route_section(entry_menu["mainHtml"])

    products = data.get("products") or {}
    for entry in products.values():
        mh = entry.get("mainHtml")
        if mh:
            entry["mainHtml"] = strip_product_menu(mh)

    routes = data.get("routes") or {}
    for path, entry in routes.items():
        if not path.startswith("/product/"):
            continue
        mh = entry.get("mainHtml")
        if mh:
            entry["mainHtml"] = strip_product_menu(mh)

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print("Synced global.ourMenuHtml; home uses <!--our-menu-slot-->; stripped /menu + products.")


if __name__ == "__main__":
    main()
