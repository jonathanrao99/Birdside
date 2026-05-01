import { HOME_ABOUT_SECTION_MARKER, OUR_MENU_SLOT_HTML } from "@/lib/our-menu-slot";

const HOME_MENU_SECTION_PREFIX = '<section class="section_home-menu"';
const HOME_MAIN_OPEN = '<main class="main-wrapper">';
const MENU_ROUTE_WRAPPER_PREFIX = '<div class="main-wrapper">';

function findSectionBounds(html: string, startIdx: number): { end: number } {
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
  throw new Error("split-page-html: unclosed <section>");
}

/** Balanced fragments inside `<main class="main-wrapper">` (PatternStrip + OurMenu mount between them). */
export type HomeMainParts = {
  part1: string;
  part2: string;
  part3: string;
};

/**
 * Splits home `mainHtml` around the Our Menu block so we can render it once via `OurMenu`.
 * Returns only the **inner** HTML of `<main class="main-wrapper">` as three balanced chunks.
 */
export function splitHomeMainAroundOurMenu(mainHtml: string): HomeMainParts {
  const mainIdx = mainHtml.indexOf(HOME_MAIN_OPEN);
  if (mainIdx < 0) {
    throw new Error("split-page-html: home page missing <main class=\"main-wrapper\">");
  }
  const innerStart = mainIdx + HOME_MAIN_OPEN.length;
  const mainClose = mainHtml.lastIndexOf("</main>");
  if (mainClose <= innerStart) {
    throw new Error("split-page-html: home page missing closing </main>");
  }
  const inner = mainHtml.slice(innerStart, mainClose);

  const aboutIdx = inner.indexOf(HOME_ABOUT_SECTION_MARKER);
  if (aboutIdx < 0) {
    throw new Error("split-page-html: home page missing section_home-about");
  }

  const part1 = inner.slice(0, aboutIdx);

  const slotIdx = inner.indexOf(OUR_MENU_SLOT_HTML);
  if (slotIdx >= 0) {
    return {
      part1,
      part2: inner.slice(aboutIdx, slotIdx),
      part3: inner.slice(slotIdx + OUR_MENU_SLOT_HTML.length)
    };
  }

  const menuStart = inner.indexOf(HOME_MENU_SECTION_PREFIX);
  if (menuStart < 0) {
    throw new Error("split-page-html: home page missing our-menu slot and section_home-menu");
  }
  const { end } = findSectionBounds(inner, menuStart);
  return {
    part1,
    part2: inner.slice(aboutIdx, menuStart),
    part3: inner.slice(end)
  };
}

/**
 * Product route HTML with any legacy embedded menu section removed.
 * Always a balanced fragment (synced JSON is already a single closed `main-wrapper` div).
 */
export function getBalancedProductMainHtml(mainHtml: string): string {
  const prod = mainHtml.indexOf('<section class="section_product">');
  if (prod < 0) return mainHtml;
  const closeProduct = mainHtml.indexOf("</section>", prod);
  if (closeProduct < 0) return mainHtml;
  const menuOpen = mainHtml.indexOf("<section>", closeProduct);
  if (menuOpen < 0) return mainHtml;
  try {
    const { end } = findSectionBounds(mainHtml, menuOpen);
    return mainHtml.slice(0, menuOpen) + mainHtml.slice(end);
  } catch {
    return mainHtml;
  }
}

/** Strips legacy `section_menu` and returns balanced HTML **inside** `<div class="main-wrapper">`. */
export function getMenuRouteInnerMainHtml(mainHtml: string): string {
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

  const w = html.indexOf(MENU_ROUTE_WRAPPER_PREFIX);
  if (w < 0) return html.trim();

  const innerStart = w + MENU_ROUTE_WRAPPER_PREFIX.length;
  const wrapClose = html.lastIndexOf("</div>");
  if (wrapClose <= innerStart) return html.slice(innerStart).trim();

  return html.slice(innerStart, wrapClose).trim();
}
