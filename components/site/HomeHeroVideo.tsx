"use client";

import { useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type SyntheticEvent
} from "react";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";

type BackdropProps = {
  desktopSrc: string;
  mobileSrc: string;
};

/** Full-viewport-width video layer; render as first child of `section_home-header`. */
export function HomeHeroVideoBackdrop({ desktopSrc, mobileSrc }: BackdropProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  /* Viewport height is now driven purely by 100svh in CSS — no JS measurement needed. */

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setActiveSrc(media.matches ? mobileSrc : desktopSrc);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [desktopSrc, mobileSrc]);

  useEffect(() => {
    if (!reducedMotion) return;
    videoRef.current?.pause();
  }, [reducedMotion]);

  /** Paused hero never fires `playing` — show first frame without fade. */
  useEffect(() => {
    if (!reducedMotion) return;
    videoRef.current?.classList.add("home-hero-video--visible");
  }, [reducedMotion, activeSrc]);

  /** Reset fade when src changes (reduced-motion effect below may re-apply immediately). */
  useEffect(() => {
    videoRef.current?.classList.remove("home-hero-video--visible");
  }, [activeSrc]);

  /** Autoplay policies: nudge play after mount when `autoPlay` alone stalls (common with remote src). */
  useEffect(() => {
    if (reducedMotion || !activeSrc) return;
    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      /* ignore — user gesture may be required on some browsers */
    });
  }, [reducedMotion, activeSrc]);

  const onVideoPlaying = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.classList.add("home-hero-video--visible");
  };

  return (
    <div className="home-hero-video-stage" aria-hidden="true">
      {activeSrc ? (
        <video
          ref={videoRef}
          autoPlay={!reducedMotion}
          className="home-hero-video home-hero-video--active"
          controls={false}
          loop
          muted
          playsInline
          onPlaying={onVideoPlaying}
          preload="auto"
          src={activeSrc}
        />
      ) : null}
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
