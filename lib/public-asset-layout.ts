/**
 * Canonical layout for files under `public/assets/` (served at `/assets/...`).
 *
 * - `brand/` — primary logo, page-loader mark, alternate logo marks, footer wordmark JPEG
 * - `home/` — template/hero imagery, about section photos, preloader letter PNGs (`preloader/letter-*.png`), decorative footer PNG, navbar checker strip
 * - `menu/covers/` — large menu tab cover art
 * - `menu/items/` — product and combo photography (`imageSrc` in `content/generated/our-menu.json`); CMS HTML in `site-content.json` may reference extra stills (e.g. `photo-vdv*.jpg`, `large-slaw.png`) kept alongside until URLs are migrated
 * - `menu/` (root) — menu route chrome: `banner-birdside.png`, `footer-banner.{jpg,webp}`, `illustration-strip.png`, optional `bg-chalkboard.webp`
 * - `sauce-lab/fonts/` — Sauce Lab display fonts (synced via `npm run sync:sauce-lab`)
 * - `sauce-lab/images/` — Sauce Lab bowl/background art; URLs generated in `lib/sauce-lab-data.ts`
 * - `lottie/` — DotLottie / JSON animations for nav, CTAs, icons
 * - `video/` — full-bleed hero background MP4 (`hero-desktop.mp4`, `hero-mobile.mp4`)
 *
 * Outside `assets/`: `public/vendor/` — Webflow export CSS (`brasa-template.shared.*.min.css`), loaded in `app/layout.tsx`, not part of the Next CSS bundle.
 */
export const PUBLIC_ASSET_BASE_PATH = "/assets" as const;
