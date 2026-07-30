"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./home-about.module.css";

export type HomeAboutImageSlide = {
  id: string;
  type: "image";
  src: string;
  alt: string;
  caption: string;
};

export type HomeAboutVideoSlide = {
  id: string;
  type: "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
};

export type HomeAboutSlide = HomeAboutImageSlide | HomeAboutVideoSlide;

type Card = { id: string; imageIndex: number; slot: number };

function slideToSrc(slide: HomeAboutSlide): { src: string; alt: string } {
  if (slide.type === "image") {
    return { src: slide.src, alt: slide.alt };
  }
  return { src: slide.poster ?? slide.src, alt: slide.alt };
}

function slotClassName(slot: number): string {
  if (slot <= -2) return styles.cardSlotM2;
  if (slot === -1) return styles.cardSlotM1;
  if (slot === 0) return styles.cardSlot0;
  if (slot === 1) return styles.cardSlot1;
  return styles.cardSlot2;
}

function slideSlot(index: number, centerIdx: number, total: number): number {
  if (total <= 1) return 0;

  let slot = (index - centerIdx + total) % total;
  if (slot > total / 2) slot -= total;
  if (total % 2 === 0 && slot === total / 2) slot = 2;

  return Math.max(-2, Math.min(2, slot));
}

type HomeAboutCarouselProps = {
  slides: readonly HomeAboutSlide[];
  initialIndex?: number;
};

function VolumeOnIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m16 9 5 5" />
      <path d="m21 9-5 5" />
    </svg>
  );
}

export default function HomeAboutCarousel({ slides, initialIndex = 0 }: HomeAboutCarouselProps) {
  const N = slides.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const [centerIdx, setCenterIdx] = useState(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, slides.length - 1))
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const [userMuted, setUserMuted] = useState(false);
  const [activeHasSound, setActiveHasSound] = useState(false);
  const animatingRef = useRef(false);
  const sectionInViewRef = useRef(sectionInView);
  const centerIdxRef = useRef(centerIdx);
  const playbackRequestRef = useRef(0);

  const cards: Card[] = slides.map((slide, index) => ({
    id: slide.id,
    imageIndex: index,
    slot: slideSlot(index, centerIdx, N)
  }));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", apply);
    queueMicrotask(apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    sectionInViewRef.current = sectionInView;
    centerIdxRef.current = centerIdx;
  }, [centerIdx, sectionInView]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observeTarget = root.closest(".section_home-about") ?? root;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0 }
    );

    observer.observe(observeTarget);
    return () => observer.disconnect();
  }, []);

  const playActiveWithSound = useCallback((force = false) => {
    if (reducedMotion || (!force && userMuted) || !sectionInViewRef.current) return;

    const activeSlide = slides[centerIdxRef.current];
    if (activeSlide?.type !== "video") return;

    const video = videoRefs.current.get(activeSlide.id);
    if (!video) return;

    const requestId = playbackRequestRef.current + 1;
    playbackRequestRef.current = requestId;

    video.volume = 1;
    video.muted = false;

    let settled = false;
    const fallbackToMuted = () => {
      if (settled || playbackRequestRef.current !== requestId) return;
      settled = true;
      video.muted = true;
      setActiveHasSound(false);
      void video.play().catch(() => undefined);
    };

    const fallbackTimer = window.setTimeout(fallbackToMuted, 700);
    const play = video.play();
    if (play) {
      play
        .then(() => {
          if (settled) return;
          settled = true;
          window.clearTimeout(fallbackTimer);
          if (playbackRequestRef.current !== requestId) return;
          const hasSound = sectionInViewRef.current && !video.paused && !video.muted;
          setActiveHasSound(hasSound);
        })
        .catch(() => {
          window.clearTimeout(fallbackTimer);
          fallbackToMuted();
        });
    } else {
      window.clearTimeout(fallbackTimer);
      setActiveHasSound(sectionInViewRef.current && !video.paused && !video.muted);
    }
  }, [reducedMotion, slides, userMuted]);

  useEffect(() => {
    const activeSlide = slides[centerIdx];

    videoRefs.current.forEach((video, slideId) => {
      const isActive = activeSlide?.id === slideId;
      const shouldPlay = isActive && sectionInView && !reducedMotion;

      if (!shouldPlay) {
        playbackRequestRef.current += 1;
        video.muted = true;
        video.pause();
        if (isActive) setActiveHasSound(false);
        return;
      }

      if (userMuted) {
        video.muted = true;
        setActiveHasSound(false);
        void video.play().catch(() => undefined);
        return;
      }
    });

    if (activeSlide?.type === "video" && sectionInView && !reducedMotion && !userMuted) {
      playActiveWithSound();
    }
  }, [centerIdx, playActiveWithSound, reducedMotion, sectionInView, slides, userMuted]);

  useEffect(() => {
    if (reducedMotion || userMuted) return;

    const handleScrollAudio = () => {
      if (!sectionInViewRef.current) return;

      const activeSlide = slides[centerIdxRef.current];
      if (activeSlide?.type !== "video") return;

      const video = videoRefs.current.get(activeSlide.id);
      if (!video) return;

      playActiveWithSound();
    };

    window.addEventListener("wheel", handleScrollAudio, { passive: true });
    window.addEventListener("scroll", handleScrollAudio, { passive: true });
    window.addEventListener("touchmove", handleScrollAudio, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScrollAudio);
      window.removeEventListener("scroll", handleScrollAudio);
      window.removeEventListener("touchmove", handleScrollAudio);
    };
  }, [playActiveWithSound, reducedMotion, slides, userMuted]);

  const setVideoRef = useCallback((slideId: string, video: HTMLVideoElement | null) => {
    if (video) {
      videoRefs.current.set(slideId, video);
    } else {
      videoRefs.current.delete(slideId);
    }
  }, []);

  const goNext = useCallback(() => {
    if (animatingRef.current || N === 0) return;
    animatingRef.current = true;
    setActiveHasSound(false);

    setCenterIdx((current) => (current + 1) % N);
    window.setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, [N]);

  const goPrev = useCallback(() => {
    if (animatingRef.current || N === 0) return;
    animatingRef.current = true;
    setActiveHasSound(false);

    setCenterIdx((current) => (current - 1 + N) % N);
    window.setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, [N]);

  const handleMuteToggle = useCallback(() => {
    if (activeHasSound) {
      setUserMuted(true);
      setActiveHasSound(false);
      const activeSlide = slides[centerIdx];
      if (activeSlide?.type === "video") {
        const video = videoRefs.current.get(activeSlide.id);
        if (video) video.muted = true;
      }
      return;
    }

    setUserMuted(false);
    playActiveWithSound(true);
  }, [activeHasSound, centerIdx, playActiveWithSound, slides]);

  if (N === 0) return null;

  const rootClass = [styles.cardsShell, reducedMotion ? styles.reducedMotion : ""].filter(Boolean).join(" ");

  return (
    <div ref={rootRef} className={rootClass}>
      <div className={styles.stage}>
        <button type="button" className={`${styles.arrowBtn} ${styles.arrowBtnLeft}`} aria-label="Previous slide" onClick={goPrev}>
          ‹
        </button>

        {cards.map((card) => {
          const slide = slides[card.imageIndex];
          if (!slide) return null;
          const { src, alt } = slideToSrc(slide);
          const slotCls = slotClassName(card.slot);
          return (
            <div
              key={card.id}
              className={`${styles.latestCard} ${slotCls}`}
            >
              {slide.type === "video" ? (
                <>
                  <video
                    ref={(video) => setVideoRef(slide.id, video)}
                    aria-label={alt}
                    className={styles.cardImage}
                    loop
                    muted={card.slot !== 0 || !activeHasSound}
                    playsInline
                    poster={slide.poster}
                    preload={card.slot === 0 ? "auto" : "none"}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                  {card.slot === 0 ? (
                    <button
                      type="button"
                      className={styles.muteToggle}
                      aria-label={activeHasSound ? "Mute carousel video" : "Unmute carousel video"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMuteToggle();
                      }}
                    >
                      {activeHasSound ? <VolumeOnIcon /> : <VolumeOffIcon />}
                    </button>
                  ) : null}
                </>
              ) : (
                <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.cardImage} priority={Math.abs(card.slot) <= 1} />
              )}
            </div>
          );
        })}

        <button type="button" className={`${styles.arrowBtn} ${styles.arrowBtnRight}`} aria-label="Next slide" onClick={goNext}>
          ›
        </button>
      </div>

      <div className={styles.mobileDots} aria-hidden>
        {slides.map((_, idx) => (
          <div key={slides[idx]?.id ?? idx} className={`${styles.mobileDot} ${idx === centerIdx ? styles.mobileDotActive : ""}`} />
        ))}
      </div>
    </div>
  );
}
