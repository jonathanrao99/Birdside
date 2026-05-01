#!/usr/bin/env python3
"""Home marquee: drop donut/hotdog icons; use only burger + fries alternating per 4-word strip."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "content" / "generated" / "site-content.json"

BURGER = (
    '<img alt="" class="home-marquee_icon" loading="lazy" '
    'src="https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/'
    '67db28ed7bd9c4e71459683c_burger.svg"/>'
)
FRIES = (
    '<img alt="" class="home-marquee_icon" loading="lazy" '
    'src="https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/'
    '67db298f4dbc990311b33037_fries.svg"/>'
)
CYCLE = (BURGER, FRIES, BURGER, FRIES)

ANY_MARQUEE_IMG = re.compile(r"<img\b[^>]*/>")


def patch_marquee(html: str) -> tuple[str, int]:
    m = re.search(
        r'(<section class="section_home-marquee"[^>]*>)(.*?)(</section>)',
        html,
        re.DOTALL,
    )
    if not m:
        return html, 0

    mid = m.group(2)
    count = 0
    out: list[str] = []
    last = 0
    for mm in ANY_MARQUEE_IMG.finditer(mid):
        if "home-marquee_icon" not in mm.group(0):
            continue
        out.append(mid[last : mm.start()])
        out.append(CYCLE[count % 4])
        count += 1
        last = mm.end()
    if count == 0:
        return html, 0
    out.append(mid[last:])
    mid_new = "".join(out)
    out_html = html[: m.start()] + m.group(1) + mid_new + m.group(3) + html[m.end() :]
    return out_html, count


def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    home = data["routes"]["/"]["mainHtml"]
    new_html, n = patch_marquee(home)
    if n == 0:
        print("No marquee icons found; unchanged.")
        return
    if new_html == home:
        print("Marquee icons already burger/fries alternating.")
        return
    data["routes"]["/"]["mainHtml"] = new_html
    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print(f"Patched {n} marquee icons (burger/fries alternating).")


if __name__ == "__main__":
    main()
