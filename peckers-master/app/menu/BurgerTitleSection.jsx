"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

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
      <filter id="burgerGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="35" />
      </filter>
      <radialGradient id="burgerWhiteGlow" cx="50%" cy="50%" r="50%">
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
      fill="url(#burgerWhiteGlow)"
      filter="url(#burgerGlow)"
    />
  </svg>
);

const POS_MAPPING_TABLET = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 30, y: -50, scale: 0.45, opacity: 0.85, z: 5 },
  [-1]: { x: -30, y: -50, scale: 0.45, opacity: 0.85, z: 5 },
  2: { x: 18, y: -100, scale: 0.2, opacity: 0.4, z: 1 },
  [-2]: { x: -18, y: -100, scale: 0.2, opacity: 0.4, z: 1 },
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

function getSlotPos(slot, isLaptop = false) {
  const mapping = isLaptop ? POS_MAPPING_LAPTOP : POS_MAPPING_TABLET;
  if (mapping[slot]) return mapping[slot];
  // Hide cards beyond distance elegantly
  return {
    x: 0,
    y: -120,
    scale: 0,
    opacity: 0,
    z: -1,
  };
}

export default function BurgerCarouselFinal({
  initialBurgers = [],
  initialNavbarData = [],
  onBurgerChange = null,
}) {
  const [burgers, setBurgers] = useState(initialBurgers);
  const [navbarData, setNavbarData] = useState(initialNavbarData || []);
  const [loading, setLoading] = useState(initialBurgers.length === 0);
  const [carousel, setCarousel] = useState(() => {
    if (initialBurgers.length > 0) {
      const initialCards = initialBurgers.map((_, i) => {
        let diff = i;
        if (diff > initialBurgers.length / 2) diff -= initialBurgers.length;
        if (diff < -initialBurgers.length / 2) diff += initialBurgers.length;
        return { id: i, index: i, slot: diff };
      });
      return { center: 0, cards: initialCards };
    }
    return { center: 0, cards: [] };
  });
  const animatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowVisible, setGlowVisible] = useState(true);

  const TOTAL = burgers.length;

  useEffect(() => {
    if (onBurgerChange) {
      onBurgerChange(carousel.center);
    }
  }, [carousel.center, onBurgerChange]);
  useEffect(() => {
    if (initialBurgers.length > 0) return;
    const fetchBurgers = async () => {
      try {
        const data =
          await client.fetch(`*[_type == "menuPage"][0].burgerCarousel[] {
          name,
          image,
          boost
        }`);
        if (data && data.length > 0) {
          const transformed = data.map((item, i) => ({
            name: item.name,
            image: urlFor(item.image).url(),
            boost: item.boost || 1,
          }));
          setBurgers(transformed);

          const initialCards = transformed.map((_, i) => {
            let diff = i;
            if (diff > data.length / 2) diff -= data.length;
            if (diff < -data.length / 2) diff += data.length;
            return { id: i, index: i, slot: diff };
          });
          setCarousel({ center: 0, cards: initialCards });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching burger data:", error);
        setLoading(false);
      }
    };
    fetchBurgers();
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
      }, 150);

      setTimeout(() => {
        animatingRef.current = false;
        setIsAnimating(false);
      }, 650);
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

  if (loading) return null;

  if (TOTAL === 0) return null;

  return (
    <>
      <div
        className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-[0vh] md:pt-[1vh] min-h-0 pb-[4vh] md:pb-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 52% at 50% 38%, #1c1c1c 0%, #0d0d0d 26%, #070707 58%, #000 100%)",
        }}
      >
        {/* BURGER STAGE */}
        <div
          className="relative w-full flex items-center justify-center mt-[8vw] md:mt-0"
          style={{ height: "clamp(230px, 42vw, 450px)" }}
        >
          {/* NAVIGATION ARROWS IN IMAGE CONTAINER */}
          <button
            onClick={goPrev}
            className="absolute left-[2vw] sm:left-[4vw] md:left-[6vw] top-1/2 -translate-y-1/2 z-30 p-[1vw] md:p-0 group"
            disabled={isAnimating}
            style={{
              cursor: isAnimating ? "wait" : "pointer",
              opacity: isAnimating ? 0.4 : 1,
              transition: "all 0.3s ease",
            }}
          >
            <div className="relative flex items-center justify-center w-[28px] h-[28px] sm:w-[38px] sm:h-[38px] md:w-[56px] md:h-[56px]">
              <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-black md:border md:border-[#EAB308]/60 md:group-hover:border-[#EAB308] md:group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-[#EAB308] rotate-180"
                  fill="currentColor"
                >
                  {/* Primary Spearhead */}
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  {/* Secondary Peak */}
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
            className="absolute right-[2vw] sm:right-[4vw] md:right-[6vw] top-1/2 -translate-y-1/2 z-30 p-[1vw] md:p-0 group"
            disabled={isAnimating}
            style={{
              cursor: isAnimating ? "wait" : "pointer",
              opacity: isAnimating ? 0.4 : 1,
              transition: "all 0.3s ease",
            }}
          >
            <div className="relative flex items-center justify-center w-[28px] h-[28px] sm:w-[38px] sm:h-[38px] md:w-[56px] md:h-[56px]">
              <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-black md:border md:border-[#EAB308]/60 md:group-hover:border-[#EAB308] md:group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-[#EAB308]"
                  fill="currentColor"
                >
                  {/* Primary Spearhead */}
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  {/* Secondary Peak */}
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

          {/* Mobile-only: simple carousel */}
          {carousel.cards.map((card) => {
            const burger = burgers[card.index];
            const isCenter = card.slot === 0;

            return (
              <div
                key={`mob-${card.id}`}
                className="block md:hidden"
                onClick={() =>
                  !isCenter &&
                  !isAnimating &&
                  Math.abs(card.slot) <= 1 &&
                  handleCardClick(card.slot)
                }
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(calc(-50% + ${card.slot * 110}vw), -50%)
                    scale(${(isCenter ? 1 : 0.7) * (burger.boost || 1)})
                  `,
                  opacity: Math.abs(card.slot) <= 1 ? (isCenter ? 1 : 0.9) : 0,
                  zIndex: isCenter ? 10 : 5,
                  transition:
                    "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                  pointerEvents: isCenter
                    ? "none"
                    : isAnimating
                      ? "none"
                      : "auto",
                  userSelect: "none",
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
                    src={burger.image}
                    alt={burger.name}
                    fill
                    priority={isCenter}
                    className="object-contain"
                    draggable={false}
                    sizes="clamp(200px, 75vw, 340px)"
                  />
                </div>
              </div>
            );
          })}

          {/* Tablet-only: full multi-card stacked carousel */}
          {carousel.cards.map((card) => {
            const cfg = getSlotPos(card.slot, false);
            const burger = burgers[card.index];
            const isCenter = card.slot === 0;

            return (
              <div
                key={`tab-${card.id}`}
                className="hidden md:block lg:hidden"
                onClick={() =>
                  !isCenter &&
                  !isAnimating &&
                  Math.abs(card.slot) <= 2 &&
                  handleCardClick(card.slot)
                }
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(calc(-50% + ${cfg.x}vw), calc(-50% + ${cfg.y}px))
                    scale(${cfg.scale * (burger.boost || 1)})
                  `,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  transition: "transform .5s ease, opacity .5s ease",
                  pointerEvents: isCenter
                    ? "none"
                    : isAnimating
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
                  }}
                >
                  <Image
                    src={burger.image}
                    alt={burger.name}
                    fill
                    priority={isCenter}
                    className={`object-contain ${isCenter ? "drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]" : ""}`}
                    draggable={false}
                    sizes="clamp(220px, 45vw, 520px)"
                  />
                </div>
              </div>
            );
          })}

          {/* Laptop-only: full multi-card stacked carousel (7 items) */}
          {carousel.cards.map((card) => {
            const cfg = getSlotPos(card.slot, true);
            const burger = burgers[card.index];
            const isCenter = card.slot === 0;

            return (
              <div
                key={`lap-${card.id}`}
                className="hidden lg:block"
                onClick={() =>
                  !isCenter &&
                  !isAnimating &&
                  Math.abs(card.slot) <= 3 &&
                  handleCardClick(card.slot)
                }
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(calc(-50% + ${cfg.x}vw), calc(-50% + ${cfg.y}px))
                    scale(${cfg.scale * (burger.boost || 1)})
                  `,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  transition: "transform .5s ease, opacity .5s ease",
                  pointerEvents: isCenter
                    ? "none"
                    : isAnimating
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
                      ? "drop-shadow(0 5px 15px rgba(0,0,0,0.3))"
                      : "none",
                    transition: "filter .4s ease",
                  }}
                >
                  <Image
                    src={burger.image}
                    alt={burger.name}
                    fill
                    priority={isCenter}
                    className="object-contain"
                    draggable={false}
                    sizes="clamp(220px, 45vw, 520px)"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* TITLE */}
        <div className="w-full flex items-center justify-center relative pb-2 md:pb-4 pt-2 md:pt-2 z-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={carousel.center}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="uppercase text-white text-center font-black text-[clamp(1.25rem,6.4vw,1.7rem)] md:text-[clamp(1.8rem,9vw,4rem)]"
              style={{
                fontFamily: "var(--font-peakers)",
                fontWeight: 900,
                letterSpacing: "0.05em",
                lineHeight: "1.1",
                textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
              }}
            >
              {burgers[carousel.center]?.name}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
