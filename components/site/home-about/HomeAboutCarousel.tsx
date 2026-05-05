"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  desktopSrc: string;
  mobileSrc: string;
  poster: string;
  alt: string;
  caption: string;
};

export type HomeAboutSlide = HomeAboutImageSlide | HomeAboutVideoSlide;

type Card = { id: number; imageIndex: number; slot: number };

const createInitialCards = (centerIdx: number, totalImages: number): Card[] => {
  if (totalImages === 0) return [];
  const N = totalImages;
  let id = 0;
  const mk = (imageIndex: number, slot: number): Card => ({
    id: id++,
    imageIndex,
    slot
  });
  return [
    mk((centerIdx - 2 + N * 100) % N, -2),
    mk((centerIdx - 1 + N * 100) % N, -1),
    mk(centerIdx % N, 0),
    mk((centerIdx + 1) % N, 1),
    mk((centerIdx + 2) % N, 2)
  ];
};

function slideToSrc(slide: HomeAboutSlide): { src: string; alt: string } {
  if (slide.type === "image") {
    return { src: slide.src, alt: slide.alt };
  }
  return { src: slide.poster, alt: slide.alt };
}

function slotClassName(slot: number): string {
  if (slot === -2) return styles.cardSlotM2;
  if (slot === -1) return styles.cardSlotM1;
  if (slot === 0) return styles.cardSlot0;
  if (slot === 1) return styles.cardSlot1;
  return styles.cardSlot2;
}

type HomeAboutCarouselProps = {
  slides: readonly HomeAboutSlide[];
  initialIndex?: number;
};

export default function HomeAboutCarousel({ slides, initialIndex = 0 }: HomeAboutCarouselProps) {
  const N = slides.length;
  const nextCardIdRef = useRef(0);
  const [cards, setCards] = useState<Card[]>(() => {
    const total = slides.length;
    if (total === 0) return [];
    const ci = Math.min(Math.max(0, initialIndex), total - 1);
    return createInitialCards(ci, total);
  });
  const [centerIdx, setCenterIdx] = useState(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, slides.length - 1))
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const animatingRef = useRef(false);

  useLayoutEffect(() => {
    nextCardIdRef.current = (cards.length ? Math.max(...cards.map((c) => c.id)) : -1) + 1;
  }, [cards]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", apply);
    queueMicrotask(apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const goNext = useCallback(() => {
    if (animatingRef.current || N === 0) return;
    animatingRef.current = true;

    const newCenter = (centerIdx + 1) % N;
    const newImageIdx = (newCenter + 2) % N;

    setCards((prev) => {
      const shifted = prev.map((c) => ({ ...c, slot: c.slot - 1 }));
      const filtered = shifted.filter((c) => c.slot >= -2);
      filtered.push({ id: nextCardIdRef.current++, imageIndex: newImageIdx, slot: 2 });
      return filtered;
    });

    setCenterIdx(newCenter);
    window.setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, [centerIdx, N]);

  const goPrev = useCallback(() => {
    if (animatingRef.current || N === 0) return;
    animatingRef.current = true;

    const newCenter = (centerIdx - 1 + N) % N;
    const newImageIdx = (newCenter - 2 + N * 100) % N;

    setCards((prev) => {
      const shifted = prev.map((c) => ({ ...c, slot: c.slot + 1 }));
      const filtered = shifted.filter((c) => c.slot <= 2);
      filtered.push({ id: nextCardIdRef.current++, imageIndex: newImageIdx, slot: -2 });
      return filtered;
    });

    setCenterIdx(newCenter);
    window.setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, [centerIdx, N]);

  const handleCardClick = useCallback(
    (slot: number) => {
      if (animatingRef.current) return;
      if (slot === -1) goPrev();
      else if (slot === 1) goNext();
    },
    [goPrev, goNext]
  );

  if (N === 0) return null;

  const rootClass = [styles.cardsShell, reducedMotion ? styles.reducedMotion : ""].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <div className={styles.stage}>
        <button type="button" className={`${styles.arrowBtn} ${styles.arrowBtnLeft}`} aria-label="Previous slide" onClick={goPrev}>
          ‹
        </button>

        {cards.map((card) => {
          const slide = slides[card.imageIndex];
          if (!slide) return null;
          const { src, alt } = slideToSrc(slide);
          const clickable = card.slot === -1 || card.slot === 1;
          const slotCls = slotClassName(card.slot);
          return (
            <div
              key={card.id}
              className={`${styles.latestCard} ${slotCls} ${clickable ? styles.latestCardClickable : ""}`}
              onClick={clickable ? () => handleCardClick(card.slot) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCardClick(card.slot);
                      }
                    }
                  : undefined
              }
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={
                card.slot === -1 ? "Previous slide" : card.slot === 1 ? "Next slide" : undefined
              }
            >
              <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.cardImage} priority={card.slot === 0} />
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
