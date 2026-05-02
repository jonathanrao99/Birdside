"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// SVG as a React Component - only the blurred radial shadow
const DropShadowSVG = () => (
  <svg
    width="776"
    height="776"
    viewBox="0 0 776 776"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      left: "50%",
      top: "40%",
      transform: "translate(-50%, -60%)",
      pointerEvents: "none",
      zIndex: 0,
      width: "clamp(250px, 50vw, 760px)",
      height: "clamp(250px, 50vw, 760px)",
      mixBlendMode: "screen",
    }}
    aria-hidden="true"
  >
    <defs>
      <filter id="menuGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
      <radialGradient id="menuWhiteGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>

    <circle
      cx="388"
      cy="388"
      r="250"
      fill="url(#menuWhiteGlow)"
      filter="url(#menuGlow)"
    />
  </svg>
);

const POS_MAPPING_TABLET = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 30, y: -40, scale: 0.45, opacity: 0.85, z: 5 },
  [-1]: { x: -30, y: -40, scale: 0.45, opacity: 0.85, z: 5 },
  2: { x: 18, y: -80, scale: 0.2, opacity: 0.4, z: 1 },
  [-2]: { x: -18, y: -80, scale: 0.2, opacity: 0.4, z: 1 },
};

const POS_MAPPING_LAPTOP = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 25, y: -40, scale: 0.45, opacity: 0.8, z: 8 },
  [-1]: { x: -25, y: -40, scale: 0.45, opacity: 0.8, z: 8 },
  2: { x: 36, y: -80, scale: 0.25, opacity: 0.6, z: 6 },
  [-2]: { x: -36, y: -80, scale: 0.25, opacity: 0.6, z: 6 },
  3: { x: 21, y: -120, scale: 0.15, opacity: 0.3, z: 4 },
  [-3]: { x: -21, y: -120, scale: 0.15, opacity: 0.3, z: 4 },
};

const MOBILE_SLOT_MAPPING = {
  0: { x: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 35, scale: 0.5, opacity: 0.25, z: 7 },
  [-1]: { x: -35, scale: 0.5, opacity: 0.25, z: 7 },
  2: { x: 70, scale: 0.35, opacity: 0.05, z: 4 },
  [-2]: { x: -70, scale: 0.35, opacity: 0.05, z: 4 },
};

function getSlotPos(slot, isLaptop = false) {
  const mapping = isLaptop ? POS_MAPPING_LAPTOP : POS_MAPPING_TABLET;
  if (mapping[slot]) return mapping[slot];
  return { x: 0, y: -120, scale: 0, opacity: 0, z: -1 };
}

export default function MenuTitleSection({
  initialItems = [],
  onItemChange = null,
}) {
  const [items] = useState(initialItems);

  const [carousel, setCarousel] = useState(() => {
    if (initialItems.length > 0) {
      const initialCards = initialItems.map((_, i) => {
        let diff = i;
        if (diff > initialItems.length / 2) diff -= initialItems.length;
        if (diff < -initialItems.length / 2) diff += initialItems.length;
        return { id: i, index: i, slot: diff };
      });
      return { center: 0, cards: initialCards };
    }
    return { center: 0, cards: [] };
  });

  const animatingRef = useRef(false);
  const touchStartXRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowVisible, setGlowVisible] = useState(true);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isLaptopViewport, setIsLaptopViewport] = useState(false);

  const TOTAL = items.length;

  useEffect(() => {
    if (onItemChange) {
      onItemChange(carousel.center);
    }
  }, [carousel.center, onItemChange]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const laptopQuery = window.matchMedia("(min-width: 1024px)");

    const syncViewportFlags = () => {
      setIsDesktopViewport(desktopQuery.matches);
      setIsLaptopViewport(laptopQuery.matches);
    };

    syncViewportFlags();

    desktopQuery.addEventListener("change", syncViewportFlags);
    laptopQuery.addEventListener("change", syncViewportFlags);

    return () => {
      desktopQuery.removeEventListener("change", syncViewportFlags);
      laptopQuery.removeEventListener("change", syncViewportFlags);
    };
  }, []);

  const getModIndex = useCallback(
    (idx) => {
      return ((idx % TOTAL) + TOTAL) % TOTAL;
    },
    [TOTAL],
  );

  const moveBy = useCallback(
    (steps) => {
      if (steps === 0 || animatingRef.current || TOTAL === 0) return;

      animatingRef.current = true;
      setIsAnimating(true);
      setGlowVisible(false);

      setCarousel((prev) => {
        const nextCenter = getModIndex(prev.center + steps);
        const nextCards = prev.cards.map((card) => {
          let diff = card.index - nextCenter;
          if (diff > TOTAL / 2) diff -= TOTAL;
          if (diff < -TOTAL / 2) diff += TOTAL;
          return { ...card, slot: diff };
        });
        return { center: nextCenter, cards: nextCards };
      });

      setTimeout(() => {
        setGlowVisible(true);
      }, 120);
      setTimeout(() => {
        animatingRef.current = false;
        setIsAnimating(false);
      }, 420);
    },
    [getModIndex, TOTAL],
  );

  const handleCardClick = useCallback(
    (clickedSlot) => {
      moveBy(clickedSlot);
    },
    [moveBy],
  );
  const goNext = useCallback(() => moveBy(1), [moveBy]);
  const goPrev = useCallback(() => moveBy(-1), [moveBy]);

  const handleTouchStart = useCallback((event) => {
    touchStartXRef.current = event.touches?.[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      if (touchStartXRef.current === null || isAnimating) {
        touchStartXRef.current = null;
        return;
      }

      const endX = event.changedTouches?.[0]?.clientX;
      if (typeof endX !== "number") return;

      const deltaX = endX - touchStartXRef.current;
      const swipeThreshold = 34;

      if (deltaX <= -swipeThreshold) {
        goNext();
      } else if (deltaX >= swipeThreshold) {
        goPrev();
      }

      touchStartXRef.current = null;
    },
    [goNext, goPrev, isAnimating],
  );

  const handleTouchCancel = useCallback(() => {
    touchStartXRef.current = null;
  }, []);

  const mobileVisibleCards = useMemo(() => {
    return carousel.cards.filter((card) => Math.abs(card.slot) <= 2);
  }, [carousel.cards]);

  if (TOTAL === 0) return null;

  return (
    <>
      <div
        className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-0 md:pt-[1vh] min-h-0 pb-[2vh] md:pb-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 52% at 50% 38%, #1c1c1c 0%, #0d0d0d 26%, #070707 58%, #000 100%)",
        }}
      >
        {/* STAGE */}
        <div
          className="relative w-full flex items-center justify-center mt-[8vw] md:mt-0"
          style={{ height: "clamp(230px, 38vw, 450px)" }}
        >
          {/* NAVIGATION ARROWS */}
          <button
            onClick={goPrev}
            className="absolute left-[2vw] sm:left-[4vw] md:left-[6vw] top-1/2 -translate-y-1/2 z-30 p-[1vw] group cursor-pointer"
            disabled={isAnimating}
          >
            <div className="relative flex items-center justify-center w-[28px] h-[28px] md:w-[56px] md:h-[56px]">
              <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-black md:border md:border-[#EAB308]/60 md:group-hover:border-[#EAB308] md:group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-[#EAB308] rotate-180"
                  fill="currentColor"
                >
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  <path
                    d="M15 25 L50 50 L15 75 L28 50 Z"
                    className="opacity-40"
                  />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={goNext}
            className="absolute right-[2vw] sm:right-[4vw] md:right-[6vw] top-1/2 -translate-y-1/2 z-30 p-[1vw] group cursor-pointer"
            disabled={isAnimating}
          >
            <div className="relative flex items-center justify-center w-[28px] h-[28px] md:w-[56px] md:h-[56px]">
              <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-black md:border md:border-[#EAB308]/60 md:group-hover:border-[#EAB308] md:group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-[#EAB308]"
                  fill="currentColor"
                >
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  <path
                    d="M15 25 L50 50 L15 75 L28 50 Z"
                    className="opacity-40"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* SVG Drop Shadow */}
          <div
            className=""
            style={{
              position: "absolute",
              left: "50%",
              top: "52%",
              transform: "translate(-50%, -33%)",
              zIndex: 1,
              pointerEvents: "none",
              width: "clamp(340px, 70vw, 760px)",
              height: "clamp(340px, 70vw, 760px)",
              opacity: glowVisible ? 0.5 : 0,
              transition: glowVisible
                ? "opacity 0.4s ease"
                : "opacity 0.1s ease",
            }}
            aria-hidden="true"
          >
            <DropShadowSVG />
          </div>

          {/* Mobile-only: lightweight swipe carousel */}
          {!isDesktopViewport && (
            <div
              className="md:hidden absolute inset-0 flex items-center justify-center overflow-visible"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
            >
              {mobileVisibleCards.map((card) => {
                const item = items[card.index];
                const isCenter = card.slot === 0;
                const cfg =
                  MOBILE_SLOT_MAPPING[card.slot] ?? MOBILE_SLOT_MAPPING[0];
                const scale = cfg.scale * (item.boost || 1);

                return (
                  <div
                    key={`mob-${card.id}`}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: cfg.z,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    <div
                      style={{
                        transform: `translate3d(${cfg.x}vw, 0, 0) scale(${scale})`,
                        opacity: cfg.opacity,
                        transition:
                          "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease",
                        willChange: "transform, opacity",
                      }}
                    >
                      <div
                        className="relative"
                        style={{
                          width: "clamp(200px, 75vw, 340px)",
                          height: "auto",
                          aspectRatio: "1/1",
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          priority={isCenter}
                          className="object-contain"
                          draggable={false}
                          sizes="clamp(200px, 75vw, 340px)"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tablet & Laptop: Optimized motion.div carousel items */}
          {isDesktopViewport &&
            carousel.cards.map((card) => {
              const cfg = getSlotPos(card.slot, isLaptopViewport);
              const item = items[card.index];
              const isCenter = card.slot === 0;
              const isVisible = isLaptopViewport
                ? Math.abs(card.slot) <= 3
                : Math.abs(card.slot) <= 2;

              return (
                <motion.div
                  key={`desk-${card.id}`}
                  className="hidden md:block transition-shadow duration-300"
                  onClick={() =>
                    !isCenter &&
                    !isAnimating &&
                    isVisible &&
                    handleCardClick(card.slot)
                  }
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${cfg.x}vw)`,
                    y: `calc(-50% + ${cfg.y}px)`,
                    scale: cfg.scale * (item.boost || 1),
                    opacity: isVisible ? cfg.opacity : 0,
                    zIndex: cfg.z,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 22,
                    mass: 0.8,
                  }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    pointerEvents: isCenter
                      ? "none"
                      : isAnimating || !isVisible
                        ? "none"
                        : "auto",
                    cursor: isCenter
                      ? "default"
                      : isAnimating
                        ? "wait"
                        : "pointer",
                    userSelect: "none",
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      width: "clamp(220px, 45vw, 520px)",
                      height: "auto",
                      aspectRatio: "1/1",
                      filter: isCenter
                        ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
                        : "none",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={isCenter}
                      className="object-contain"
                      draggable={false}
                      sizes="clamp(220px, 45vw, 520px)"
                    />
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* TITLE */}
        <div className="w-full flex items-center justify-center relative pb-1 md:pb-2 pt-1 md:pt-2 z-20 overflow-hidden">
          <h1
            className="uppercase text-white text-center font-black text-[clamp(1.25rem,6.4vw,1.7rem)] md:text-[clamp(1.8rem,9vw,4rem)]"
            style={{
              fontFamily: "var(--font-peakers)",
              fontWeight: 900,
              letterSpacing: "0.05em",
              lineHeight: "1.1",
              textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            {items[carousel.center]?.name}
          </h1>
        </div>
      </div>
    </>
  );
}
