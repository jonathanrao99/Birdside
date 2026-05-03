"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type SyntheticEvent } from "react";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
import "./home-hero-video.css";

type BackdropProps = {
  desktopSrc: string;
  mobileSrc: string;
};

/** Full-viewport-width video layer; render as first child of `section_home-header`. */
export function HomeHeroVideoBackdrop({ desktopSrc, mobileSrc }: BackdropProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!reducedMotion) return;
    desktopRef.current?.pause();
    mobileRef.current?.pause();
  }, [reducedMotion]);

  /** Paused hero never fires `playing` — show first frame without fade. */
  useEffect(() => {
    if (!reducedMotion) return;
    desktopRef.current?.classList.add("home-hero-video--visible");
    mobileRef.current?.classList.add("home-hero-video--visible");
  }, [reducedMotion, desktopSrc, mobileSrc]);

  /** Reset fade when src changes (reduced-motion effect below may re-apply immediately). */
  useEffect(() => {
    desktopRef.current?.classList.remove("home-hero-video--visible");
    mobileRef.current?.classList.remove("home-hero-video--visible");
  }, [desktopSrc, mobileSrc]);

  /** Autoplay policies: nudge play after mount when `autoPlay` alone stalls (common with remote src). */
  useEffect(() => {
    if (reducedMotion) return;
    const d = desktopRef.current;
    const m = mobileRef.current;
    const kick = (v: HTMLVideoElement | null) => {
      if (!v) return;
      void v.play().catch(() => {
        /* ignore — user gesture may be required on some browsers */
      });
    };
    kick(d);
    kick(m);
  }, [reducedMotion, desktopSrc, mobileSrc]);

  const onVideoPlaying = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.classList.add("home-hero-video--visible");
  };

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
        onPlaying={onVideoPlaying}
        preload="auto"
        src={desktopSrc}
      />
      <video
        ref={mobileRef}
        autoPlay={!reducedMotion}
        className="home-hero-video home-hero-video--mobile"
        controls={false}
        loop
        muted
        playsInline
        onPlaying={onVideoPlaying}
        preload="auto"
        src={mobileSrc}
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
