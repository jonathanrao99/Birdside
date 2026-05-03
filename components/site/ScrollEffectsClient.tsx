"use client";

import { useLenis } from "@/components/site/lenis-context";
import { ensureScrollTriggerRegistered } from "@/lib/gsap/register-scroll-trigger";
import { setupCtaProgress } from "@/lib/scroll/cta-progress";
import { setupHomeMenuParallax } from "@/lib/scroll/home-menu-parallax";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-linked DOM effects (GSAP ScrollTrigger + `gsap.context` revert).
 * Lenis calls `ScrollTrigger.update` from SmoothScroll when smooth scroll is active;
 * otherwise the window scroller drives ScrollTrigger.
 * UI transitions (PageLoader, hero, nav, tabs) stay on Motion — not here.
 *
 * `pathname` and `lenis` in deps re-bind after client navigations and Lenis init/teardown.
 */
export default function ScrollEffectsClient() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const ScrollTrigger = ensureScrollTriggerRegistered();
    const unsubs = [setupCtaProgress(lenis), setupHomeMenuParallax(lenis)];
    queueMicrotask(() => {
      ScrollTrigger.refresh();
    });
    return () => {
      unsubs.forEach((u) => u());
      queueMicrotask(() => {
        ScrollTrigger.refresh();
      });
    };
  }, [lenis, pathname]);

  return null;
}
