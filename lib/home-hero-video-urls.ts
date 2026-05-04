/** Served from `public/assets/video/` (no env, no Blob). */
export const HOME_HERO_VIDEO_DESKTOP_SRC = "/assets/video/hero-desktop.mp4" as const;
export const HOME_HERO_VIDEO_MOBILE_SRC = "/assets/video/hero-mobile.mp4" as const;

export function getHomeHeroVideoUrls(): {
  desktopSrc: string;
  mobileSrc: string;
} {
  return {
    desktopSrc: HOME_HERO_VIDEO_DESKTOP_SRC,
    mobileSrc: HOME_HERO_VIDEO_MOBILE_SRC
  };
}
