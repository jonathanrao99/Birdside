"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

// lenisRef – optional ref that the parent can use to call lenis.scrollTo(0) etc.
export default function SmoothScroll({ children, lenisRef }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      normalizeWheel: true,
    });

    // Expose instance to parent (ClientWrapper) so it can reset scroll
    if (lenisRef) {
      lenisRef.current = lenis;
    }
    //Final glitches fixed

    // GSAP ticker drives Lenis — one clean loop, properly cleaned up below
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      if (lenisRef) lenisRef.current = null;
    };
  }, []);

  // Force Lenis to recalculate on route changes
  useLayoutEffect(() => {
    if (lenisRef.current) {
      // Only reset scroll to top if the pathname has actually changed (navigation, not reload)
      if (prevPathname.current !== pathname) {
        lenisRef.current.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        prevPathname.current = pathname;
      }

      // Force recalculation after a brief delay to allow DOM to update
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
          ScrollTrigger.refresh();
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [pathname, lenisRef]);

  return <>{children}</>;
}
