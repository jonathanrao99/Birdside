#!/usr/bin/env node
/**
 * One-time: move/rename files under public/ and rewrite URL strings in generated JSON.
 * Run from repo root: node scripts/reorganize-public-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

/** Paths relative to public/assets/ (no leading slash). */
const assetMoves = [
  ["birdside-logo.png", "brand/birdside-logo.png"],
  ["footer-birdside-wordmark.jpg", "brand/footer-wordmark.jpg"],
  ["2026-04-23.webp", "home/template-hero-bg.webp"],
  ["10-077375a3-b633-494a-844b-52967a4a1d05.png", "home/hero-marquee-panel.png"],
  ["hero-wings-tray.jpg", "home/hero-wings-tray.jpg"],
  ["2.jpg", "menu/items/extra-tender.jpg"],
  ["about-home-cards.jpg", "home/about-home-cards.jpg"],
  ["about-sando.jpg", "home/about-sando.jpg"],
  ["about-section-composite.jpg", "home/about-section-composite.jpg"],
  ["about-wings.jpg", "home/about-wings.jpg"],
  ["footer.png", "home/footer-decoration.png"],
  ["navbar-checker-strip.png", "home/navbar-checker-strip.png"],
  ["menu-cover-wings-spread.webp", "menu/covers/wings-spread.webp"],
  ["menu-cover-sando.png", "menu/covers/sando.png"],
  ["menu-cover-chalkboard.webp", "menu/covers/chalkboard.webp"],
  ["menu-cover-sketches.webp", "menu/covers/sketches.webp"],
  ["menu-cover-spread.png", "menu/covers/spread.png"],
  ["menu-bg-chalkboard.webp", "menu/bg-chalkboard.webp"],
  ["menu-banner-birdside.png", "menu/banner-birdside.png"],
  ["menu-footer-banner.jpg", "menu/footer-banner.jpg"],
  ["menu-footer-banner.webp", "menu/footer-banner.webp"],
  ["menu-illustration-strip.png", "menu/illustration-strip.png"],
  ["THE 5 PIECE.png", "menu/items/five-piece.png"],
  ["THE 5 PIECE COMBO.jpg", "menu/items/five-piece-combo.jpg"],
  ["THE 8 PIECE.jpg", "menu/items/eight-piece.jpg"],
  ["THE 8 PIECE COMBO.jpeg", "menu/items/eight-piece-combo.jpeg"],
  ["THE 12 PIECE.jpg", "menu/items/twelve-piece.jpg"],
  ["THE 12 PIECE COMBO.jpeg", "menu/items/twelve-piece-combo.jpeg"],
  ["THE SANDO COMBO.jpg", "menu/items/sando-combo.jpg"],
  ["Tenders cropped.png", "menu/items/tenders.png"],
  ["Loaded side fries chicken.jpg", "menu/items/loaded-side-fries.jpg"],
  ["MAPLE BUFFALO RANCH FRIES.jpg", "menu/items/maple-buffalo-ranch-fries.jpg"],
  ["Mac_and_cheese.jpg", "menu/items/mac-and-cheese.jpg"],
  ["11.jpg", "menu/items/wing-box.jpg"],
  ["9.jpg", "menu/items/garlic-parmesan-fries.jpg"],
  ["VDV06465.jpg", "menu/items/photo-vdv06465.jpg"],
  ["VDV06487.jpg", "menu/items/photo-vdv06487.jpg"],
  ["VDV06735.jpg", "menu/items/photo-vdv06735.jpg"],
  ["20411_-3__67398.webp", "menu/items/water-bottle.webp"],
  ["BirdsideHTX-118.jpg", "home/location-hero-118.jpg"],
  ["Logo2.png", "brand/logo-mark-2.png"],
  [
    "Screenshot 2026-04-28 at 8.41.10\u202fPM.png",
    "menu/items/large-slaw.png"
  ],
  [
    "Screenshot 2026-04-28 at 8.42.37\u202fPM.png",
    "menu/items/seasoned-fries.png"
  ],
  [
    "Screenshot 2026-04-28 at 8.37.03\u202fPM.png",
    "menu/items/dipping-sauce.png"
  ],
  [
    "Screenshot 2026-04-28 at 8.31.10\u202fPM.png",
    "menu/items/wing-sauce.png"
  ],
  [
    "ChatGPT Image Apr 28, 2026, 06_42_39 PM (1).png",
    "home/menu-tab-panel-bg.png"
  ],
  ["1234-removebg-preview (1)-Photoroom.png", "brand/page-loader-logo.png"],
  [
    "Screenshot_2025-12-30_at_2.49.48_PM-removebg-preview-2.png",
    "menu/items/legacy-strip-2025-12-30.png"
  ],
  [
    "Screenshot_2025-12-30_at_2.49.48_PM-removebg-preview-2__1_-removebg-preview (1).png",
    "menu/items/legacy-strip-2025-12-30-alt.png"
  ],
  ["logo4-removebg-preview (1).png", "brand/logo-variant.png"],
  [
    "logo4-removebg-preview (1)-Picsart-BackgroundRemover.png",
    "brand/logo-variant-flat.png"
  ],
  ["home-preloader-letters/1.png", "home/preloader/letter-1.png"],
  ["home-preloader-letters/2.png", "home/preloader/letter-2.png"],
  ["home-preloader-letters/3.png", "home/preloader/letter-3.png"],
  ["home-preloader-letters/4.png", "home/preloader/letter-4.png"],
  ["home-preloader-letters/5.png", "home/preloader/letter-5.png"],
  ["home-preloader-letters/6.png", "home/preloader/letter-6.png"],
  ["home-preloader-letters/7.png", "home/preloader/letter-7.png"],
  ["home-preloader-letters/8.png", "home/preloader/letter-8.png"]
];

const videoMoves = [
  ["BirdsideDesktop.mp4", "assets/video/hero-desktop.mp4"],
  ["BirdsideMobile.mp4", "assets/video/hero-mobile.mp4"]
];

function encodedAssetPath(rel) {
  return (
    "/assets/" +
    rel
      .split("/")
      .map((seg) => encodeURIComponent(seg))
      .join("/")
  );
}

function plainAssetPath(rel) {
  return "/assets/" + rel;
}

/** All URL spellings that might appear in HTML/JSON for this asset path. */
function urlVariantsForRel(rel) {
  const plain = plainAssetPath(rel);
  const enc = encodedAssetPath(rel);
  const s = new Set([plain, enc]);
  return [...s];
}

function mkdirpSync(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  for (const [, toRel] of assetMoves) {
    mkdirpSync(path.join(publicDir, "assets", path.dirname(toRel)));
  }
  for (const [, toRel] of videoMoves) {
    mkdirpSync(path.join(publicDir, path.dirname(toRel)));
  }

  for (const [fromRel, toRel] of assetMoves) {
    const fromAbs = path.join(publicDir, "assets", fromRel);
    const toAbs = path.join(publicDir, "assets", toRel);
    if (!fs.existsSync(fromAbs)) {
      console.warn("skip missing:", fromAbs);
      continue;
    }
    mkdirpSync(path.dirname(toAbs));
    fs.renameSync(fromAbs, toAbs);
    console.log("mv", fromRel, "->", toRel);
  }

  for (const [fromRel, toRel] of videoMoves) {
    const fromAbs = path.join(publicDir, fromRel);
    const toAbs = path.join(publicDir, toRel);
    if (!fs.existsSync(fromAbs)) {
      console.warn("skip missing video:", fromAbs);
      continue;
    }
    mkdirpSync(path.dirname(toAbs));
    fs.renameSync(fromAbs, toAbs);
    console.log("mv", fromRel, "->", toRel);
  }

  const dupLogo = path.join(publicDir, "assets", "BirdsideLogo.png");
  if (fs.existsSync(dupLogo)) {
    fs.unlinkSync(dupLogo);
    console.log("rm unused BirdsideLogo.png");
  }

  const pairs = [];
  for (const [fromRel, toRel] of assetMoves) {
    const newUrl = plainAssetPath(toRel);
    for (const oldUrl of urlVariantsForRel(fromRel)) {
      pairs.push([oldUrl, newUrl]);
    }
  }

  const oldVideoDesktop = "/BirdsideDesktop.mp4";
  const oldVideoMobile = "/BirdsideMobile.mp4";
  pairs.push(
    [oldVideoDesktop, "/assets/video/hero-desktop.mp4"],
    [oldVideoMobile, "/assets/video/hero-mobile.mp4"]
  );

  pairs.sort((a, b) => b[0].length - a[0].length);

  for (const jsonRel of [
    "content/generated/site-content.json",
    "content/generated/our-menu.json"
  ]) {
    const jsonPath = path.join(root, jsonRel);
    if (!fs.existsSync(jsonPath)) continue;
    let text = fs.readFileSync(jsonPath, "utf8");
    for (const [from, to] of pairs) {
      if (text.includes(from)) text = text.split(from).join(to);
    }
    fs.writeFileSync(jsonPath, text, "utf8");
    JSON.parse(text);
    console.log("rewrote", jsonRel);
  }

  const lettersDir = path.join(publicDir, "assets", "home-preloader-letters");
  if (fs.existsSync(lettersDir)) {
    try {
      fs.rmdirSync(lettersDir);
      console.log("rmdir empty home-preloader-letters");
    } catch {
      /* not empty or missing */
    }
  }

  console.log("done");
}

main();
