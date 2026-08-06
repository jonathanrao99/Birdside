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

  /** Lenis keeps its own scroll offset; reset to top on client navigations (e.g. footer links). */
  useEffect(() => {
    let cancelled = false;

    const apply = () => {
      if (cancelled || typeof window === "undefined") return;
      const hash = window.location.hash;

      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      if (hash.length > 1) {
        const fragment = decodeURIComponent(hash.slice(1));
        requestAnimationFrame(() => {
          if (cancelled) return;
          const el = document.getElementById(fragment);
          if (el && lenis) {
            lenis.scrollTo(el, { immediate: false });
          } else if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    };

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(apply);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [pathname, lenis]);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    let cancelled = false;
    let unsubs: Array<() => void> = [];
    let rafA = 0;
    let rafB = 0;

    const bindScrollEffects = () => {
      if (cancelled) return;
      const ScrollTrigger = ensureScrollTriggerRegistered();
      unsubs = [setupCtaProgress(lenis), setupHomeMenuParallax(lenis)];
      queueMicrotask(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    rafA = requestAnimationFrame(() => {
      rafB = requestAnimationFrame(bindScrollEffects);
    });

    return () => {
      cancelled = true;
      if (rafA) cancelAnimationFrame(rafA);
      if (rafB) cancelAnimationFrame(rafB);
      unsubs.forEach((u) => u());
      queueMicrotask(() => {
        ensureScrollTriggerRegistered().refresh();
      });
    };
  }, [lenis, pathname]);

  return null;
}
