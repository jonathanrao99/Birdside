"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from "react";

export type MenuCarouselItem = {
  image: string;
  name: string;
  /** Optional scale multiplier for center card (default 1). */
  boost?: number;
};

const POS_MAPPING_TABLET: Record<
  number,
  { x: number; y: number; scale: number; opacity: number; z: number }
> = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 30, y: -40, scale: 0.45, opacity: 0.85, z: 5 },
  [-1]: { x: -30, y: -40, scale: 0.45, opacity: 0.85, z: 5 },
  2: { x: 18, y: -80, scale: 0.2, opacity: 0.4, z: 1 },
  [-2]: { x: -18, y: -80, scale: 0.2, opacity: 0.4, z: 1 }
};

const POS_MAPPING_LAPTOP: Record<
  number,
  { x: number; y: number; scale: number; opacity: number; z: number }
> = {
  0: { x: 0, y: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 25, y: -40, scale: 0.45, opacity: 0.8, z: 8 },
  [-1]: { x: -25, y: -40, scale: 0.45, opacity: 0.8, z: 8 },
  2: { x: 36, y: -80, scale: 0.25, opacity: 0.6, z: 6 },
  [-2]: { x: -36, y: -80, scale: 0.25, opacity: 0.6, z: 6 },
  3: { x: 21, y: -120, scale: 0.15, opacity: 0.3, z: 4 },
  [-3]: { x: -21, y: -120, scale: 0.15, opacity: 0.3, z: 4 }
};

const MOBILE_SLOT_MAPPING: Record<
  number,
  { x: number; scale: number; opacity: number; z: number }
> = {
  0: { x: 0, scale: 1, opacity: 1, z: 10 },
  1: { x: 35, scale: 0.5, opacity: 0.25, z: 7 },
  [-1]: { x: -35, scale: 0.5, opacity: 0.25, z: 7 },
  2: { x: 70, scale: 0.35, opacity: 0.05, z: 4 },
  [-2]: { x: -70, scale: 0.35, opacity: 0.05, z: 4 }
};

function getSlotPos(slot: number, isLaptop: boolean) {
  const mapping = isLaptop ? POS_MAPPING_LAPTOP : POS_MAPPING_TABLET;
  if (mapping[slot] !== undefined) return mapping[slot];
  return { x: 0, y: -120, scale: 0, opacity: 0, z: -1 };
}

function DropShadowSVG({ filterId, gradId }: { filterId: string; gradId: string }) {
  return (
    <svg
      width={776}
      height={776}
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
        mixBlendMode: "screen"
      }}
      aria-hidden
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx={388}
        cy={388}
        r={250}
        fill={`url(#${gradId})`}
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}

type Props = {
  items: MenuCarouselItem[];
  onActiveIndexChange?: (index: number) => void;
};

export default function MenuPageCarousel({ items, onActiveIndexChange }: Props) {
  const uid = useId().replace(/:/g, "");
  const filterId = `${uid}-blur`;
  const gradId = `${uid}-glow`;

  const [carousel, setCarousel] = useState(() => {
    if (items.length > 0) {
      const initialCards = items.map((_, i) => {
        let diff = i;
        if (diff > items.length / 2) diff -= items.length;
        if (diff < -items.length / 2) diff += items.length;
        return { id: i, index: i, slot: diff };
      });
      return { center: 0, cards: initialCards };
    }
    return { center: 0, cards: [] as { id: number; index: number; slot: number }[] };
  });

  const animatingRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowVisible, setGlowVisible] = useState(true);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isLaptopViewport, setIsLaptopViewport] = useState(false);

  const TOTAL = items.length;

  useEffect(() => {
    onActiveIndexChange?.(carousel.center);
  }, [carousel.center, onActiveIndexChange]);

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
    (idx: number) => ((idx % TOTAL) + TOTAL) % TOTAL,
    [TOTAL]
  );

  const moveBy = useCallback(
    (steps: number) => {
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

      setTimeout(() => setGlowVisible(true), 120);
      setTimeout(() => {
        animatingRef.current = false;
        setIsAnimating(false);
      }, 420);
    },
    [getModIndex, TOTAL]
  );

  const handleCardClick = useCallback(
    (clickedSlot: number) => {
      moveBy(clickedSlot);
    },
    [moveBy]
  );
  const goNext = useCallback(() => moveBy(1), [moveBy]);
  const goPrev = useCallback(() => moveBy(-1), [moveBy]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartXRef.current = event.touches?.[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartXRef.current === null || isAnimating) {
        touchStartXRef.current = null;
        return;
      }

      const endX = event.changedTouches?.[0]?.clientX;
      if (typeof endX !== "number") return;

      const deltaX = endX - touchStartXRef.current;
      const swipeThreshold = 34;

      if (deltaX <= -swipeThreshold) goNext();
      else if (deltaX >= swipeThreshold) goPrev();

      touchStartXRef.current = null;
    },
    [goNext, goPrev, isAnimating]
  );

  const handleTouchCancel = useCallback(() => {
    touchStartXRef.current = null;
  }, []);

  const mobileVisibleCards = useMemo(
    () => carousel.cards.filter((card) => Math.abs(card.slot) <= 2),
    [carousel.cards]
  );

  if (TOTAL === 0) return null;

  const arrowBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 30,
    padding: "1vw",
    cursor: "pointer",
    background: "none",
    border: "none"
  };

  const arrowInnerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(28px, 8vw, 56px)",
    height: "clamp(28px, 8vw, 56px)"
  };

  return (
    <div
      className="menu-page-carousel"
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        paddingTop: 0,
        minHeight: 0,
        paddingBottom: "2vh",
        background:
          "radial-gradient(ellipse 50% 52% at 50% 38%, #1c1c1c 0%, #0d0d0d 26%, #070707 58%, #000 100%)"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "clamp(1.5rem, 8vw, 2rem)",
          height: "clamp(230px, 38vw, 450px)"
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={isAnimating}
          aria-label="Previous item"
          style={{ ...arrowBtnStyle, left: "clamp(0.5rem, 2vw, 2rem)" }}
        >
          <span style={arrowInnerStyle}>
            <span
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease"
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: "65%",
                  height: "65%",
                  color: "#eab308",
                  transform: "rotate(180deg)"
                }}
                fill="currentColor"
                aria-hidden
              >
                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                <path d="M15 25 L50 50 L15 75 L28 50 Z" opacity={0.4} />
              </svg>
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={isAnimating}
          aria-label="Next item"
          style={{ ...arrowBtnStyle, right: "clamp(0.5rem, 2vw, 2rem)" }}
        >
          <span style={arrowInnerStyle}>
            <span
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{ width: "65%", height: "65%", color: "#eab308" }}
                fill="currentColor"
                aria-hidden
              >
                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                <path d="M15 25 L50 50 L15 75 L28 50 Z" opacity={0.4} />
              </svg>
            </span>
          </span>
        </button>

        <div
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
            transition: glowVisible ? "opacity 0.4s ease" : "opacity 0.1s ease"
          }}
          aria-hidden
        >
          <DropShadowSVG filterId={filterId} gradId={gradId} />
        </div>

        {!isDesktopViewport && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible"
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            {mobileVisibleCards.map((card) => {
              const item = items[card.index];
              if (!item) return null;
              const isCenter = card.slot === 0;
              const cfg = MOBILE_SLOT_MAPPING[card.slot] ?? MOBILE_SLOT_MAPPING[0];
              const scale = cfg.scale * (item.boost ?? 1);

              return (
                <div
                  key={`mob-${card.id}`}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: cfg.z,
                    pointerEvents: "none",
                    userSelect: "none"
                  }}
                >
                  <div
                    style={{
                      transform: `translate3d(${cfg.x}vw, 0, 0) scale(${scale})`,
                      opacity: cfg.opacity,
                      transition:
                        "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease",
                      willChange: "transform, opacity"
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "clamp(200px, 75vw, 340px)",
                        height: "auto",
                        aspectRatio: "1 / 1"
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority={isCenter}
                        style={{ objectFit: "contain" }}
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

        {isDesktopViewport &&
          carousel.cards.map((card) => {
            const cfg = getSlotPos(card.slot, isLaptopViewport);
            const item = items[card.index];
            if (!item) return null;
            const isCenter = card.slot === 0;
            const isVisible = isLaptopViewport
              ? Math.abs(card.slot) <= 3
              : Math.abs(card.slot) <= 2;

            return (
              <motion.div
                key={`desk-${card.id}`}
                initial={false}
                animate={{
                  x: `calc(-50% + ${cfg.x}vw)`,
                  y: `calc(-50% + ${cfg.y}px)`,
                  scale: cfg.scale * (item.boost ?? 1),
                  opacity: isVisible ? cfg.opacity : 0,
                  zIndex: cfg.z
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 22,
                  mass: 0.8
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
                  cursor: isCenter ? "default" : isAnimating ? "wait" : "pointer",
                  userSelect: "none"
                }}
                onClick={() =>
                  !isCenter && !isAnimating && isVisible && handleCardClick(card.slot)
                }
              >
                <div
                  style={{
                    position: "relative",
                    width: "clamp(220px, 45vw, 520px)",
                    height: "auto",
                    aspectRatio: "1 / 1",
                    filter: isCenter ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" : "none"
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={isCenter}
                    style={{ objectFit: "contain" }}
                    draggable={false}
                    sizes="clamp(220px, 45vw, 520px)"
                  />
                </div>
              </motion.div>
            );
          })}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "0.5rem 0.75rem 1rem",
          zIndex: 20,
          overflow: "hidden"
        }}
      >
        <h1
          style={{
            margin: 0,
            textTransform: "uppercase",
            color: "#fff",
            textAlign: "center",
            fontWeight: 900,
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
            fontFamily:
              'system-ui, "Impact", "Haettenschweiler", "Arial Narrow Bold", sans-serif',
            fontSize: "clamp(1.25rem, 6.4vw, 2.75rem)"
          }}
        >
          {items[carousel.center]?.name}
        </h1>
      </div>
    </div>
  );
}
