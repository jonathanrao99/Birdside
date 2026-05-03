/** Hero background videos: Blob/CDN URLs in production; local fallbacks to /public (gitignored). */
export function getHomeHeroVideoUrls(): { desktopSrc: string; mobileSrc: string } {
  const desktop =
    trimEnv("NEXT_PUBLIC_HOME_HERO_VIDEO_DESKTOP") ||
    trimEnv("HOME_HERO_VIDEO_DESKTOP") ||
    "/BirdsideDesktop.mov";
  const mobile =
    trimEnv("NEXT_PUBLIC_HOME_HERO_VIDEO_MOBILE") ||
    trimEnv("HOME_HERO_VIDEO_MOBILE") ||
    "/BirdsideHeroMobile.mov";
  return { desktopSrc: desktop, mobileSrc: mobile };
}

function trimEnv(name: string): string | undefined {
  const v = process.env[name];
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}
