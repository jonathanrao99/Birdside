#!/usr/bin/env node
/**
 * Reads `content/generated/site-content.json` → `global.ourMenuHtml`,
 * writes structured `content/generated/our-menu.json` for React Our Menu.
 *
 * Regenerate after Webflow/menu HTML changes:
 *   node scripts/extract-our-menu.mjs
 */
import { parse } from "node-html-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sitePath = path.join(root, "content", "generated", "site-content.json");
const outPath = path.join(root, "content", "generated", "our-menu.json");

function innerText(el) {
  if (!el) return "";
  return el.text.replace(/\s+/g, " ").trim();
}

function parseBlock(block) {
  const img = block.querySelector("img.menu_img");
  const nameEl = block.querySelector("h3.menu_name");
  const descEl = block.querySelector(".menu_desc");
  const link = block.querySelector("a.button-icon_component[href], a[href^='/product/']");
  const priceWrap = block.querySelector(".menu_texts .text-color-grey-300");
  const priceDiv = priceWrap?.querySelector("div");
  const imageSizes = img?.getAttribute("sizes") ?? undefined;
  return {
    imageAlt: img?.getAttribute("alt") ?? "",
    imageSrc: img?.getAttribute("src") ?? "",
    imageSizes,
    name: innerText(nameEl),
    price: innerText(priceDiv) || innerText(priceWrap),
    description: innerText(descEl),
    productHref: link?.getAttribute("href") ?? "",
    buttonWId: link?.getAttribute("data-w-id") ?? undefined
  };
}

function main() {
  const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
  const html = site.global?.ourMenuHtml?.trim();
  if (!html) {
    console.error("No global.ourMenuHtml in site-content.json");
    process.exit(1);
  }

  const doc = parse(html);
  const section = doc.querySelector("section.section_home-menu");
  if (!section) {
    console.error("Missing section.section_home-menu");
    process.exit(1);
  }

  const coverImg = section.querySelector(".home-menu_cover-wrap img.menu_cover");
  const pattern = section.querySelector(".home-menu_cover-wrap .menu_pattern");
  const heading = innerText(section.querySelector(".menu_component h2")) || "Our menu";

  const tabsRoot = section.querySelector(".menu_tabs.w-tabs");
  if (!tabsRoot) {
    console.error("Missing .menu_tabs.w-tabs");
    process.exit(1);
  }

  const defaultTabId =
    tabsRoot.getAttribute("data-current")?.trim() || "Tab 1";

  const cover = {
    alt: coverImg?.getAttribute("alt") ?? "",
    src: coverImg?.getAttribute("src") ?? "",
    width: coverImg?.getAttribute("width")
      ? Number(coverImg.getAttribute("width"))
      : undefined,
    height: coverImg?.getAttribute("height")
      ? Number(coverImg.getAttribute("height"))
      : undefined,
    sizes: coverImg?.getAttribute("sizes") ?? undefined,
    dataWId: coverImg?.getAttribute("data-w-id") ?? undefined
  };

  const patternMeta = pattern
    ? { dataWId: pattern.getAttribute("data-w-id") ?? undefined }
    : undefined;

  const linkEls = tabsRoot.querySelectorAll(".menu_tabs-menu a.w-tab-link");
  const tabs = [];
  for (const a of linkEls) {
    const id = a.getAttribute("data-w-tab")?.trim();
    if (!id) continue;
    const label = innerText(a.querySelector("div")) || innerText(a);
    const panes = tabsRoot.querySelectorAll(".w-tab-content > .w-tab-pane");
    const pane = [...panes].find(
      (p) => p.getAttribute("data-w-tab")?.trim() === id
    );
    if (!pane) {
      console.warn("No pane for tab", id);
      continue;
    }
    const blocks = pane.querySelectorAll(".menu_block-content");
    const items = [...blocks].map(parseBlock);
    tabs.push({ id, label, items });
  }

  const data = {
    version: 1,
    heading,
    defaultTabId,
    cover,
    ...(patternMeta ? { pattern: patternMeta } : {}),
    tabs
  };

  fs.writeFileSync(outPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("Wrote", outPath, "tabs:", tabs.length, "items:", tabs.reduce((n, t) => n + t.items.length, 0));
}

main();
