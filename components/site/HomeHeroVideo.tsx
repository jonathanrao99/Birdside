"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
import "./home-hero-video.css";

type BackdropProps = {
  desktopSrc: string;
  mobileSrc: string;
};

const LOCAL_DESKTOP_FALLBACKS = ["/assets/video/hero-desktop.mov", "/BirdsideDesktop.mov"];
const LOCAL_MOBILE_FALLBACKS = ["/assets/video/hero-mobile.mov", "/BirdsideHeroMobile.mov"];

function withLocalFallbacks(src: string, fallbacks: string[]) {
  const candidates = [src, ...fallbacks];
  return candidates.filter((candidate, index) => candidates.indexOf(candidate) === index);
}

/** Full-viewport-width video layer; render as first child of `section_home-header`. */
export function HomeHeroVideoBackdrop({ desktopSrc, mobileSrc }: BackdropProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const desktopSources = useMemo(
    () => withLocalFallbacks(desktopSrc, LOCAL_DESKTOP_FALLBACKS),
    [desktopSrc]
  );
  const mobileSources = useMemo(
    () => withLocalFallbacks(mobileSrc, LOCAL_MOBILE_FALLBACKS),
    [mobileSrc]
  );
  const [desktopSourceIndex, setDesktopSourceIndex] = useState(0);
  const [mobileSourceIndex, setMobileSourceIndex] = useState(0);

  useEffect(() => {
    setDesktopSourceIndex(0);
    setMobileSourceIndex(0);
  }, [desktopSrc, mobileSrc]);

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
  }, [reducedMotion, desktopSources, mobileSources]);

  /** Reset fade when src changes (reduced-motion effect below may re-apply immediately). */
  useEffect(() => {
    desktopRef.current?.classList.remove("home-hero-video--visible");
    mobileRef.current?.classList.remove("home-hero-video--visible");
  }, [desktopSources, mobileSources, desktopSourceIndex, mobileSourceIndex]);

  const playVideo = useCallback(
    (video: HTMLVideoElement | null) => {
      if (!video || reducedMotion) return;
      void video.play().catch(() => {
        /* ignore — user gesture may be required on some browsers */
      });
    },
    [reducedMotion]
  );

  /** Autoplay policies: nudge play after mount when `autoPlay` alone stalls (common with remote src). */
  useEffect(() => {
    playVideo(desktopRef.current);
    playVideo(mobileRef.current);
  }, [desktopSourceIndex, mobileSourceIndex, playVideo]);

  const onVideoReady = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.classList.add("home-hero-video--visible");
    playVideo(e.currentTarget);
  };

  const onVideoPlaying = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.classList.add("home-hero-video--visible");
  };

  const onDesktopError = () => {
    setDesktopSourceIndex((i) => Math.min(i + 1, desktopSources.length - 1));
  };

  const onMobileError = () => {
    setMobileSourceIndex((i) => Math.min(i + 1, mobileSources.length - 1));
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
        onCanPlay={onVideoReady}
        onError={onDesktopError}
        onLoadedData={onVideoReady}
        onPlaying={onVideoPlaying}
        preload="auto"
        src={desktopSources[desktopSourceIndex]}
      />
      <video
        ref={mobileRef}
        autoPlay={!reducedMotion}
        className="home-hero-video home-hero-video--mobile"
        controls={false}
        loop
        muted
        playsInline
        onCanPlay={onVideoReady}
        onError={onMobileError}
        onLoadedData={onVideoReady}
        onPlaying={onVideoPlaying}
        preload="auto"
        src={mobileSources[mobileSourceIndex]}
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
