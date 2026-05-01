"use client";

import Lenis from "lenis";
import { type ReactNode, useLayoutEffect } from "react";

type Props = { children: ReactNode };

/**
 * Lenis smooth scroll — softer inertia than CSS scroll-behavior alone.
 * Skipped when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: Props) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      lerp: 0.052,
      wheelMultiplier: 0.86,
      touchMultiplier: 0.94,
      smoothWheel: true
    });

    const syncCta = () => {
      window.dispatchEvent(new CustomEvent("birdside-lenis-scroll"));
    };
    lenis.on("scroll", syncCta);

    return () => {
      lenis.off("scroll", syncCta);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
