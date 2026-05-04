/**
 * Canonical layout for files under `public/assets/` (served at `/assets/...`).
 *
 * - `brand/` — primary logo, page-loader mark, alternate logo marks, footer wordmark JPEG
 * - `home/` — template/hero imagery, about section photos, preloader letter PNGs (`preloader/letter-*.png`), decorative footer PNG, navbar checker strip
 * - `menu/covers/` — large menu tab cover art
 * - `menu/items/` — product and combo photography
 * - `lottie/` — DotLottie / JSON animations for nav, CTAs, icons
 * - `video/` — full-bleed hero background MP4 (`hero-desktop.mp4`, `hero-mobile.mp4`)
 */
export const PUBLIC_ASSET_BASE_PATH = "/assets" as const;
