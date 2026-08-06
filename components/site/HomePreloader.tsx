"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  HOME_PRELOADER_COMPLETE_EVENT,
  HOME_PRELOADER_LENIS_BUMP_MS,
  HOME_PRELOADER_LETTER_SRCS,
  HOME_PRELOADER_SESSION_KEY,
  HOME_PRELOADER_SR_LABEL
} from "@/lib/home-preloader-letters";

function subscribe() {
  return () => {};
}

function dispatchPreloaderComplete() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(HOME_PRELOADER_COMPLETE_EVENT));
}

function preloadLetterImages() {
  if (typeof window === "undefined") return Promise.resolve();

  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(".birdside-home-preloader__letter")
  );

  return Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return img.decode?.().catch(() => undefined) ?? Promise.resolve();
    })
  ).then(() => undefined);
}

function homeIntroAlreadyShown(): boolean {
  try {
    return sessionStorage.getItem(HOME_PRELOADER_SESSION_KEY) === "true";
  } catch {
    return true;
  }
}

type Props = {
  onComplete?: () => void;
};

/** GSAP segment durations (seconds). */
const DUR_INITIAL_HOLD = 0.35;
const DUR_GAP = 0.85;
const DUR_ROW_SCALE = 0.55;
const DUR_ROW_HOLD = 0.25;
const DUR_CURTAIN = 0.85;
const DUR_REVEAL = 0.65;

/**
 * First session visit to `/` only: letter-row tracking, scale, curtain slide + reveal zoom
 * on `#birdside-preloader-reveal` (see PageShell). Sits above the image route loader.
 */
export default function HomePreloader({ onComplete }: Props) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  const shouldAnimate =
    hydrated &&
    pathname === "/" &&
    !dismissed &&
    !homeIntroAlreadyShown();

  useLayoutEffect(() => {
    if (!shouldAnimate) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = document.querySelector("#birdside-preloader-reveal");
    const container = containerRef.current;
    const row = rowRef.current;
    const letters = row
      ? Array.from(row.querySelectorAll<HTMLElement>(".birdside-home-preloader__letter"))
      : [];

    if (!container || !row) return;

    const finish = () => {
      try {
        sessionStorage.setItem(HOME_PRELOADER_SESSION_KEY, "true");
      } catch {
        /* ignore private mode */
      }
      setDismissed(true);
      queueMicrotask(dispatchPreloaderComplete);
      window.setTimeout(dispatchPreloaderComplete, HOME_PRELOADER_LENIS_BUMP_MS);
      onComplete?.();
    };

    if (!reveal) {
      finish();
      return;
    }

    if (reduced) {
      gsap.set(reveal, { clearProps: "all" });
      finish();
      return;
    }

    gsap.set(reveal, {
      scale: 1,
      y: 0,
      opacity: 0,
      transformOrigin: "50% calc(var(--birdside-vh, 1svh) * 60)"
    });

    const center = (letters.length - 1) / 2;
    const spread = Math.min(Math.max(window.innerWidth * 0.075, 42), 92);

    gsap.set(row, { force3D: true });
    gsap.set(letters, {
      x: (i) => (i - center) * spread,
      force3D: true,
      willChange: "transform"
    });

    let cancelled = false;
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set(reveal, { clearProps: "all" });
        finish();
      }
    });

    tl.to(letters, {
      x: 0,
      duration: DUR_GAP
    }, DUR_INITIAL_HOLD);

    tl.to(row, {
      duration: DUR_ROW_SCALE + DUR_ROW_HOLD
    });

    tl.to(container, {
      yPercent: 100,
      duration: DUR_CURTAIN,
      ease: "power4.inOut"
    });

    tl.to(
      reveal,
      {
        opacity: 1,
        duration: DUR_REVEAL,
        ease: "power3.out"
      },
      "<"
    );

    preloadLetterImages().then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (!cancelled) tl.play(0);
      });
    });

    return () => {
      cancelled = true;
      tl.kill();
      gsap.set(letters, { clearProps: "transform,willChange" });
      gsap.set("#birdside-preloader-reveal", { clearProps: "all" });
    };
  }, [shouldAnimate, onComplete]);

  if (pathname !== "/") return null;

  if (!hydrated) {
    return (
      <div
        aria-hidden
        className="birdside-home-preloader birdside-home-preloader--pending"
      />
    );
  }

  if (homeIntroAlreadyShown() || dismissed) return null;

  return (
    <div
      ref={containerRef}
      className="birdside-home-preloader"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="birdside-sr-only">{HOME_PRELOADER_SR_LABEL}</span>
      <div ref={rowRef} className="birdside-home-preloader__letters">
        {HOME_PRELOADER_LETTER_SRCS.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element -- static letter PNGs
          <img
            key={src}
            src={src}
            alt=""
            className="birdside-home-preloader__letter"
            decoding="async"
            fetchPriority="high"
          />
        ))}
      </div>
    </div>
  );
}
