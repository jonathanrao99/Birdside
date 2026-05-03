"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { homeHeroSlides } from "@/lib/home-hero-slides";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
import "./home-hero-video.css";

/** GitHub rejects >100MB files; keep .mov out of git and point production at hosted URLs. */
const DESKTOP_SRC =
  process.env.NEXT_PUBLIC_HOME_HERO_VIDEO_DESKTOP?.trim() || "/BirdsideDesktop.mov";
const MOBILE_SRC =
  process.env.NEXT_PUBLIC_HOME_HERO_VIDEO_MOBILE?.trim() || "/BirdsideHeroMobile.mov";
const poster = homeHeroSlides[0]?.imageSrc ?? "";

/** Full-viewport-width video layer; render as first child of `section_home-header`. */
export function HomeHeroVideoBackdrop() {
  const reducedMotion = useReducedMotion() ?? false;
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!reducedMotion) return;
    desktopRef.current?.pause();
    mobileRef.current?.pause();
  }, [reducedMotion]);

  return (
    <div className="home-hero-video-stage" aria-hidden="true">
      <video
        ref={desktopRef}
        autoPlay={!reducedMotion}
        className="home-hero-video home-hero-video--desktop"
        controls={false}
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
        src={DESKTOP_SRC}
      />
      <video
        ref={mobileRef}
        autoPlay={!reducedMotion}
        className="home-hero-video home-hero-video--mobile"
        controls={false}
        loop
        muted
        playsInline
        poster={poster}
        preload="metadata"
        src={MOBILE_SRC}
      />
    </div>
  );
}

/** Order CTA over the video (inside padded hero column). */
export default function HomeHeroVideo() {
  return (
    <div className="home-header_images home-header_images--video-cta">
      <div className="home-hero-video-cta-stack">
        <h1 className="home-hero-video-cta-heading">
          <span className="home-hero-video-cta-heading__line">This Ain&apos;t</span>
          <span className="home-hero-video-cta-heading__line">Regular</span>
          <span className="home-hero-video-cta-heading__line">Chicken.</span>
        </h1>
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
    </div>
  );
}
