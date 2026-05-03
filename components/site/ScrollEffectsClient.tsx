"use client";

import { useLenis } from "@/components/site/lenis-context";
import { setupHomeMenuProductImgNav } from "@/lib/dom/home-menu-product-img-nav";
import { setupCtaProgress } from "@/lib/scroll/cta-progress";
import { setupHomeMenuParallax } from "@/lib/scroll/home-menu-parallax";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll/DOM effects previously inline in app/layout.tsx.
 * `pathname` in deps re-binds section observers after client navigations (layout persists).
 * Our Menu tabs are React-controlled when `our-menu.json` exists (`HomeMenuClient` + `home-menu-overrides.css`).
 */
export default function ScrollEffectsClient() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const unsubs = [
      setupCtaProgress(lenis),
      setupHomeMenuParallax(lenis),
      setupHomeMenuProductImgNav()
    ];
    return () => {
      unsubs.forEach((u) => u());
    };
  }, [lenis, pathname]);

  return null;
}
