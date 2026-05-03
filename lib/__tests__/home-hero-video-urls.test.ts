import { afterEach, describe, expect, it, vi } from "vitest";
import { getHomeHeroVideoUrls } from "@/lib/home-hero-video-urls";

describe("getHomeHeroVideoUrls", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rewrites private Vercel Blob host to public for browser video src", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_HOME_HERO_VIDEO_DESKTOP",
      "https://x.private.blob.vercel-storage.com/BirdsideDesktop.mov"
    );
    vi.stubEnv("NEXT_PUBLIC_HOME_HERO_VIDEO_MOBILE", "");
    const { desktopSrc, mobileSrc } = getHomeHeroVideoUrls();
    expect(desktopSrc).toBe("https://x.public.blob.vercel-storage.com/BirdsideDesktop.mov");
    expect(mobileSrc).toBe("/BirdsideHeroMobile.mov");
  });
});
