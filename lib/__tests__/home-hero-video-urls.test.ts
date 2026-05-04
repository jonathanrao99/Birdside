import { describe, expect, it } from "vitest";
import {
  getHomeHeroVideoUrls,
  HOME_HERO_VIDEO_DESKTOP_SRC,
  HOME_HERO_VIDEO_MOBILE_SRC
} from "@/lib/home-hero-video-urls";

describe("getHomeHeroVideoUrls", () => {
  it("returns static public MP4 paths", () => {
    expect(HOME_HERO_VIDEO_DESKTOP_SRC).toBe("/assets/video/hero-desktop.mp4");
    expect(HOME_HERO_VIDEO_MOBILE_SRC).toBe("/assets/video/hero-mobile.mp4");
    expect(getHomeHeroVideoUrls()).toEqual({
      desktopSrc: HOME_HERO_VIDEO_DESKTOP_SRC,
      mobileSrc: HOME_HERO_VIDEO_MOBILE_SRC
    });
  });
});
