"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import {
  homeHeroSlides,
  type HomeHeroSlide
} from "@/lib/home-hero-slides";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/** Brasa home hero IX timing (approximate; template has no manual controls). */
const AUTOPLAY_MS = 6000;

/**
 * translateX (vw) for wraps _1.._3 — tighter than published Brasa so side cards stay in view
 * (51/65vw pushes past the viewport on many widths).
 */
const BRASA_TX: ReadonlyArray<readonly [number, number, number]> = [
  [0, 30, 40],
  [-30, 0, 30],
  [-40, -30, 0]
];

const BRASA_SC: ReadonlyArray<readonly [number, number, number]> = [
  [1, 0.55, 0.46],
  [0.55, 1, 0.55],
  [0.46, 0.55, 1]
];

const EASE_IMAGE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const EASE_HEAD = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

type HomeHeroCarouselProps = {
  slides?: HomeHeroSlide[];
};

function headingStyle(
  activeIdx: number,
  i: number,
  reduced: boolean
): CSSProperties {
  const on = activeIdx === i;
  return {
    opacity: on ? 1 : 0,
    transform: on
      ? "translate3d(0, 0, 0) scale3d(1, 1, 1)"
      : "translate3d(0, 30%, 0) scale3d(0.7, 0.7, 1)",
    display: "block",
    transition: reduced
      ? undefined
      : `opacity 0.55s ease, transform 0.85s ${EASE_HEAD}`
  };
}

function imageWrapStyle(
  activeIdx: number,
  slot: number,
  reduced: boolean
): CSSProperties {
  const tx = BRASA_TX[activeIdx][slot];
  const sc = BRASA_SC[activeIdx][slot];
  const z = sc >= 1 ? 5 : Math.abs(tx) >= 36 ? 2 : 3;
  return {
    transform: `translate3d(${tx}vw, 0, 0) scale3d(${sc}, ${sc}, 1)`,
    display: "flex",
    zIndex: z,
    transition: reduced ? undefined : `transform 0.9s ${EASE_IMAGE}`
  };
}

export default function HomeHeroCarousel({
  slides = homeHeroSlides
}: HomeHeroCarouselProps) {
  const stageSlides = slides.slice(0, 3);
  const count = stageSlides.length;
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || count <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reducedMotion, count]);

  return (
    <>
      <div className="home-header_headings">
        {stageSlides.map((s, i) => (
          <h1
            key={s.imageSrc}
            aria-hidden={i !== index}
            className={`home-header_heading _${i + 1}`}
            style={headingStyle(index, i, reducedMotion)}
          >
            <span className="home-header_heading-line">{s.line1}</span>
            <span className="home-header_heading-line">{s.line2}</span>
          </h1>
        ))}
      </div>
      <div className="home-header_images">
        {stageSlides.map((slide, i) => (
          <div
            key={slide.imageSrc}
            aria-hidden={i !== index}
            className={`home-header_image-wrap _${i + 1}`}
            style={imageWrapStyle(index, i, reducedMotion)}
          >
            <Image
              alt={slide.alt}
              className="home-header_image"
              fill
              priority={i === 0}
              sizes="(max-width: 767px) 90vw, 70vw"
              src={slide.imageSrc}
            />
          </div>
        ))}
        <div className="home-header_button-wrap">
          <Link className="home-header_button w-inline-block" href="/menu">
            <div className="home-header_button-text">Order now</div>
          </Link>
        </div>
      </div>
    </>
  );
}
