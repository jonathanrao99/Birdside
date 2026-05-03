"use client";

import Lenis from "lenis";
import { type ReactNode, useLayoutEffect, useState } from "react";
import ScrollEffectsClient from "@/components/site/ScrollEffectsClient";
import { LenisProvider } from "@/components/site/lenis-context";

type Props = { children: ReactNode };

/**
 * Lenis smooth scroll — softer inertia than CSS scroll-behavior alone.
 * Skipped when the user prefers reduced motion. Exposes instance via LenisProvider
 * for scroll-linked effects (CTA, home menu parallax).
 */
export default function SmoothScroll({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
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
    instance.on("scroll", syncCta);

    queueMicrotask(() => {
      setLenis(instance);
    });

    return () => {
      instance.off("scroll", syncCta);
      instance.destroy();
      queueMicrotask(() => {
        setLenis(null);
      });
    };
  }, []);

  return (
    <LenisProvider value={lenis}>
      {children}
      <ScrollEffectsClient />
    </LenisProvider>
  );
}
