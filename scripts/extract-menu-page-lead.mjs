/**
 * Reads `content/generated/site-content.json` → `/menu` inner main, extracts the first
 * `section_testimonials` block, writes `content/generated/menu-page-lead.json`.
 * Regenerate after menu HTML changes: `npm run extract:menu-lead`
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const MENU_WRAPPER = '<div class="main-wrapper">';
const PREFIX = '<section class="section_testimonials">';

function findSectionBounds(html, startIdx) {
  let depth = 0;
  let i = startIdx;
  while (i < html.length) {
    if (html.startsWith("<section", i)) {
      depth += 1;
      const gt = html.indexOf(">", i);
      i = gt < 0 ? html.length : gt + 1;
      continue;
    }
    if (html.startsWith("</section>", i)) {
      depth -= 1;
      i += 10;
      if (depth === 0) return { end: i };
      continue;
    }
    i += 1;
  }
  throw new Error("extract-menu-page-lead: unclosed <section>");
}

function getMenuRouteInnerMainHtml(mainHtml) {
  let html = mainHtml;
  const legacyMenu = html.indexOf('<section class="section_menu">');
  if (legacyMenu >= 0) {
    try {
      const { end } = findSectionBounds(html, legacyMenu);
      html = html.slice(0, legacyMenu) + html.slice(end);
    } catch {
      /* keep */
    }
  }
  const w = html.indexOf(MENU_WRAPPER);
  if (w < 0) return html.trim();
  const innerStart = w + MENU_WRAPPER.length;
  const wrapClose = html.lastIndexOf("</div>");
  if (wrapClose <= innerStart) return html.slice(innerStart).trim();
  return html.slice(innerStart, wrapClose).trim();
}

const sitePath = path.join(root, "content", "generated", "site-content.json");
const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
const entry = site.routes?.["/menu"];
if (!entry?.mainHtml) {
  console.error("Missing routes['/menu'].mainHtml");
  process.exit(1);
}

const inner = getMenuRouteInnerMainHtml(entry.mainHtml);
const idx = inner.indexOf(PREFIX);
if (idx < 0) {
  console.error("Menu inner main missing section_testimonials");
  process.exit(1);
}
const { end } = findSectionBounds(inner, idx);
const leadHtml = inner.slice(idx, end);

const out = {
  version: 1,
  leadHtml
};

const outPath = path.join(root, "content", "generated", "menu-page-lead.json");
fs.writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`);
console.log("Wrote", outPath, `(${leadHtml.length} chars)`);
