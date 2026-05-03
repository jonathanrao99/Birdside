/** Session flag: homepage letter intro already played this tab session. */
export const HOME_PRELOADER_SESSION_KEY = "birdside_home_preloader_shown";

/** Lenis lives under SmoothScroll; preloader dispatches this so Lenis can `resize()`. */
export const HOME_PRELOADER_COMPLETE_EVENT = "birdside-home-preloader-complete";

/** Delayed Lenis/ScrollTrigger bump after intro (ms); keep in sync with `HomePreloader` tail. */
export const HOME_PRELOADER_LENIS_BUMP_MS = 455;

/**
 * Ordered letter PNGs (manual slices, BIRDSIDE) under `public/assets/home-preloader-letters/`.
 */
export const HOME_PRELOADER_LETTER_SRCS: readonly string[] = [
  "/assets/home-preloader-letters/1.png",
  "/assets/home-preloader-letters/2.png",
  "/assets/home-preloader-letters/3.png",
  "/assets/home-preloader-letters/4.png",
  "/assets/home-preloader-letters/5.png",
  "/assets/home-preloader-letters/6.png",
  "/assets/home-preloader-letters/7.png",
  "/assets/home-preloader-letters/8.png"
] as const;

export const HOME_PRELOADER_SR_LABEL = "Birdside";
