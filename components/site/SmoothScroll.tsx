"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect, useLayoutEffect, useState } from "react";
import ScrollEffectsClient from "@/components/site/ScrollEffectsClient";
import { LenisProvider } from "@/components/site/lenis-context";
import { ensureScrollTriggerRegistered } from "@/lib/gsap/register-scroll-trigger";
import {
  HOME_PRELOADER_COMPLETE_EVENT,
  HOME_PRELOADER_LENIS_BUMP_MS
} from "@/lib/home-preloader-letters";

type Props = { children: ReactNode };

/**
 * Lenis smooth scroll — softer inertia than CSS scroll-behavior alone.
 * Skipped when the user prefers reduced motion. Exposes instance via LenisProvider.
 * Lenis `scroll` drives `ScrollTrigger.update` so GSAP scroll effects stay in sync.
 */
export default function SmoothScroll({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ScrollTrigger = ensureScrollTriggerRegistered();

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

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed"
    });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    instance.on("scroll", onLenisScroll);

    queueMicrotask(() => {
      setLenis(instance);
      ScrollTrigger.refresh();
    });

    return () => {
      instance.off("scroll", onLenisScroll);
      instance.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, undefined);
      queueMicrotask(() => {
        setLenis(null);
        ScrollTrigger.refresh();
      });
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    const bump = () => {
      lenis.resize();
      ensureScrollTriggerRegistered().refresh();
    };
    const onPreloaderDone = () => {
      queueMicrotask(bump);
      window.setTimeout(bump, HOME_PRELOADER_LENIS_BUMP_MS);
    };
    window.addEventListener(HOME_PRELOADER_COMPLETE_EVENT, onPreloaderDone);
    return () =>
      window.removeEventListener(HOME_PRELOADER_COMPLETE_EVENT, onPreloaderDone);
  }, [lenis]);

  return (
    <LenisProvider value={lenis}>
      {children}
      <ScrollEffectsClient />
    </LenisProvider>
  );
}
