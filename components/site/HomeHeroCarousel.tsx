"use client";

/**
 * Home hero motion: `motion/react` drives heading and image-stage transforms.
 * Marquee, mobile nav, and other global motion stay in app/globals.css (see plan).
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  homeHeroSlides,
  type HomeHeroSlide
} from "@/lib/home-hero-slides";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";

/** Brasa home hero IX timing (approximate; template has no manual controls). */
const AUTOPLAY_MS = 6000;

/**
 * translateX (vw) for wraps _1.._3 — tighter than published Brasa so side cards stay in view
 * (51/65vw pushes past the viewport on many widths).
 */
/** Desktop — Brasa-like spread (vw). */
const BRASA_TX_LG: ReadonlyArray<readonly [number, number, number]> = [
  [0, 30, 40],
  [-30, 0, 30],
  [-40, -30, 0]
];

/** Tablet — keep motion but stay inside the hero clip (no horizontal bleed). */
const BRASA_TX_MD: ReadonlyArray<readonly [number, number, number]> = [
  [0, 14, 18],
  [-14, 0, 14],
  [-18, -14, 0]
];

/** Phone — tighter stage for narrow viewports. */
const BRASA_TX_SM: ReadonlyArray<readonly [number, number, number]> = [
  [0, 9, 12],
  [-9, 0, 9],
  [-12, -9, 0]
];

function heroTxTier(): "lg" | "md" | "sm" {
  if (typeof window === "undefined") return "lg";
  const w = window.innerWidth;
  if (w <= 479) return "sm";
  if (w <= 767) return "md";
  return "lg";
}

function subscribeHeroTx(cb: () => void) {
  window.addEventListener("resize", cb);
  const mq479 = window.matchMedia("(max-width: 479px)");
  const mq767 = window.matchMedia("(max-width: 767px)");
  mq479.addEventListener("change", cb);
  mq767.addEventListener("change", cb);
  return () => {
    window.removeEventListener("resize", cb);
    mq479.removeEventListener("change", cb);
    mq767.removeEventListener("change", cb);
  };
}

function useHeroTx(): ReadonlyArray<readonly [number, number, number]> {
  const tier = useSyncExternalStore(subscribeHeroTx, heroTxTier, () => "lg");
  if (tier === "sm") return BRASA_TX_SM;
  if (tier === "md") return BRASA_TX_MD;
  return BRASA_TX_LG;
}

const BRASA_SC: ReadonlyArray<readonly [number, number, number]> = [
  [1, 0.55, 0.46],
  [0.55, 1, 0.55],
  [0.46, 0.55, 1]
];

/** Matches prior CSS cubic-bezier(0.25, 0.46, 0.45, 0.94) for headings and images. */
const EASE_BRASA = [0.25, 0.46, 0.45, 0.94] as const;

type HomeHeroCarouselProps = {
  slides?: HomeHeroSlide[];
};

export default function HomeHeroCarousel({
  slides = homeHeroSlides
}: HomeHeroCarouselProps) {
  const stageSlides = slides.slice(0, 3);
  const count = stageSlides.length;
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;
  const heroTx = useHeroTx();

  useEffect(() => {
    if (reducedMotion || count <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reducedMotion, count]);

  const instant = reducedMotion ? { duration: 0 } : false;

  return (
    <>
      <div className="home-header_headings">
        {stageSlides.map((s, i) => {
          const on = index === i;
          return (
            <motion.h1
              key={s.imageSrc}
              aria-hidden={!on}
              className={`home-header_heading _${i + 1}`}
              style={{ display: "block" }}
              initial={false}
              animate={{
                opacity: on ? 1 : 0,
                y: on ? "0%" : "30%",
                scale: on ? 1 : 0.7
              }}
              transition={
                instant
                  ? instant
                  : {
                      opacity: { duration: 0.55, ease: "easeOut" },
                      y: { duration: 0.85, ease: EASE_BRASA },
                      scale: { duration: 0.85, ease: EASE_BRASA }
                    }
              }
            >
              <span className="home-header_heading-line">{s.line1}</span>
              <span className="home-header_heading-line">{s.line2}</span>
            </motion.h1>
          );
        })}
      </div>
      <div className="home-header_images">
        {stageSlides.map((slide, i) => {
          const tx = heroTx[index][i];
          const sc = BRASA_SC[index][i];
          const z = sc >= 1 ? 5 : Math.abs(tx) >= 36 ? 2 : 3;
          return (
            <motion.div
              key={slide.imageSrc}
              aria-hidden={i !== index}
              className={`home-header_image-wrap _${i + 1}`}
              style={{ display: "flex", zIndex: z }}
              initial={false}
              animate={{
                x: `${tx}vw`,
                scale: sc
              }}
              transition={
                instant
                  ? instant
                  : { duration: 0.9, ease: EASE_BRASA }
              }
            >
              <Image
                alt={slide.alt}
                className="home-header_image"
                fill
                priority={i === 0}
                sizes="(max-width: 767px) 90vw, 70vw"
                src={slide.imageSrc}
              />
            </motion.div>
          );
        })}
        <div className="home-header_button-wrap">
          <a
            className="home-header_button w-inline-block"
            href={ORDER_NOW_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="home-header_button-text">Order now</div>
          </a>
        </div>
      </div>
    </>
  );
}
