/** Hero background videos: Blob/CDN URLs in production; local fallbacks to /public (gitignored). */
export function getHomeHeroVideoUrls(): { desktopSrc: string; mobileSrc: string } {
  const desktopRaw =
    trimEnv("NEXT_PUBLIC_HOME_HERO_VIDEO_DESKTOP") ||
    trimEnv("HOME_HERO_VIDEO_DESKTOP") ||
    "/assets/video/hero-desktop.mov";
  const mobileRaw =
    trimEnv("NEXT_PUBLIC_HOME_HERO_VIDEO_MOBILE") ||
    trimEnv("HOME_HERO_VIDEO_MOBILE") ||
    "/assets/video/hero-mobile.mov";
  return {
    desktopSrc: normalizeHeroVideoUrl(desktopRaw),
    mobileSrc: normalizeHeroVideoUrl(mobileRaw)
  };
}

/**
 * Private Blob hostnames need auth — `<video src>` cannot use them. Public blobs use
 * `*.public.blob.vercel-storage.com` (dashboard sometimes surfaces the private host).
 */
function normalizeHeroVideoUrl(url: string): string {
  if (!url.includes(".private.blob.vercel-storage.com")) return url;
  return url.replace(/\.private\.blob\.vercel-storage\.com/g, ".public.blob.vercel-storage.com");
}

function trimEnv(name: string): string | undefined {
  const v = process.env[name];
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}
