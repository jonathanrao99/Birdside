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
const DUR_GAP = 1.64;
const DUR_ROW_SCALE = 1.64;
const DUR_CURTAIN = 2.08;
const DUR_REVEAL = 1.28;

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
      scale: 2.3,
      y: -100,
      opacity: 0,
      transformOrigin: "50% 60vh"
    });

    gsap.set(row, {
      gap: "clamp(2.5rem, 12vw, 7rem)",
      scale: 1
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set(reveal, { clearProps: "all" });
        finish();
      }
    });

    tl.to(row, {
      gap: "0.12rem",
      duration: DUR_GAP
    });

    tl.to(row, {
      scale: 1.06,
      duration: DUR_ROW_SCALE,
      ease: "power2.inOut"
    });

    tl.to(container, {
      yPercent: 100,
      duration: DUR_CURTAIN,
      ease: "power4.inOut"
    });

    tl.to(
      reveal,
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: DUR_REVEAL,
        ease: "power3.out"
      },
      "<"
    );

    return () => {
      tl.kill();
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
