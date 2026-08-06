"use client";

import { SAUCE_LAB_ITEMS } from "@/lib/sauce-lab-data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import styles from "./sauce-lab-page.module.css";

const saucesData = SAUCE_LAB_ITEMS;

function isMayoTitle(title: string | undefined) {
  const t = title?.toLowerCase() ?? "";
  return t.includes("mayo") || t.includes("mayonnaise");
}

function isBirdSauce(title: string | undefined) {
  return title?.trim().toLowerCase() === "bird sauce";
}

/** Highlights “secret” / “kill” for Bird Sauce copy (third font + brand red). */
function birdSauceDescFragments(text: string) {
  const parts = text.split(/(\bsecret\b|\bkill\b)/gi);
  return parts.map((part, index) => {
    if (/^(secret|kill)$/i.test(part)) {
      return (
        <span key={index} className={styles.birdSauceEmphasis}>
          {part}
        </span>
      );
    }
    return part;
  });
}

function displayHeadingTitle(title: string) {
  const upper = title.toUpperCase().trim();
  const baseTitle = upper.replace(/\s*SAUCE$/i, "").trim();
  if (baseTitle.includes("MAYO") || baseTitle.includes("MAYONNAISE")) {
    return "HOUSE MAYO";
  }
  if (["CHEESE", "BUFFALO", "BUFFLO", "BUFFLAO"].includes(baseTitle)) {
    return `${baseTitle} SAUCE`;
  }
  if (baseTitle === "BIRD") {
    return "BIRD SAUCE";
  }
  return baseTitle;
}

function SauceSectionContent() {
  const searchParams = useSearchParams();
  const sauceParam = searchParams.get("sauce");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">(
    "next"
  );
  const [rotation, setRotation] = useState(0);
  const [nutritionIndex, setNutritionIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  const {
    ringItems,
    ringLabels,
    ringOffsets,
    ringCenterOffsetsData,
    baseRotation
  } = useMemo(() => {
    const ringGapUnits = isDesktop ? 0.15 : 2;
    const ringItemsBase =
      saucesData.length > 1
        ? [
            { sauce: saucesData[0], index: 0 },
            ...saucesData
              .slice(1)
              .map((sauce, index) => ({ sauce, index: index + 1 }))
              .reverse()
          ]
        : saucesData.map((sauce, index) => ({ sauce, index }));
    const ringItemsLocal = ringItemsBase.map((item, idx) => ({
      ...item,
      id: `ring-item-${item.index}-${idx}`
    }));

    const ringLabelsLocal = ringItemsLocal.map((item) => {
      let labelTitle = (item.sauce?.title || "")
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();
      if (labelTitle.startsWith("AYONNAISE")) labelTitle = `M${labelTitle}`;
      const baseTitle = labelTitle.replace(/\s*SAUCE$/, "").trim();

      let finalTitle = baseTitle;
      if (baseTitle.includes("MAYO") || baseTitle.includes("MAYONNAISE")) {
        finalTitle = "HOUSE MAYO";
      } else if (
        ["CHEESE", "BUFFALO", "BUFFLO", "BUFFLAO"].includes(baseTitle)
      ) {
        finalTitle = `${baseTitle} SAUCE`;
      } else if (baseTitle === "BIRD") {
        finalTitle = "BIRD SAUCE";
      }

      return `• ${finalTitle} •`;
    });

    const ringLayout = ringLabelsLocal.reduce(
      (acc, label) => {
        const start = acc.cursor;
        const center = start + label.length / 2;
        return {
          cursor: start + label.length + ringGapUnits,
          starts: [...acc.starts, start],
          centers: [...acc.centers, center]
        };
      },
      { cursor: 0, starts: [] as number[], centers: [] as number[] }
    );

    const ringTotalUnits = Math.max(ringLayout.cursor, 1);
    const ringCenterOffsetsDataLocal = ringLayout.centers.map(
      (center) => (center / ringTotalUnits) * 100
    );
    const ringOffsetsLocal = ringCenterOffsetsDataLocal.map(
      (offset) => `${offset}%`
    );
    const baseRotationLocal =
      90 - (ringCenterOffsetsDataLocal[0] || 0) * 3.6;

    return {
      ringItems: ringItemsLocal,
      ringLabels: ringLabelsLocal,
      ringOffsets: ringOffsetsLocal,
      ringCenterOffsetsData: ringCenterOffsetsDataLocal,
      baseRotation: baseRotationLocal
    };
  }, [isDesktop]);

  const transitionToIndex = useCallback(
    (targetIndex: number) => {
      if (!saucesData.length || targetIndex === currentIndex) return;

      const targetRingIndices = ringItems
        .map((item, idx) => (item.index === targetIndex ? idx : -1))
        .filter((idx) => idx !== -1);

      const currentRingIdx = ringItems.findIndex(
        (item) => item.index === currentIndex
      );
      const currentPos = ringCenterOffsetsData[currentRingIdx] * 3.6;

      let bestDelta = 999;
      targetRingIndices.forEach((idx) => {
        const pos = ringCenterOffsetsData[idx] * 3.6;
        let d = pos - currentPos;
        while (d > 180) d -= 360;
        while (d < -180) d += 360;
        if (Math.abs(d) < Math.abs(bestDelta)) bestDelta = d;
      });

      setNutritionIndex(0);
      setSlideDirection(bestDelta > 0 ? "next" : "prev");
      setCurrentIndex(targetIndex);
      setRotation((prev) => prev - bestDelta);
    },
    [currentIndex, ringCenterOffsetsData, ringItems]
  );

  const transitionRef = useRef(transitionToIndex);
  useEffect(() => {
    transitionRef.current = transitionToIndex;
  });

  useEffect(() => {
    if (!sauceParam || saucesData.length === 0) return;
    const targetSauce = sauceParam.toLowerCase();
    const index = saucesData.findIndex((s) => {
      const titleNormalized = s.title?.toLowerCase().trim().replace(/\s+/g, "-");
      return (
        titleNormalized === targetSauce ||
        titleNormalized.replace(/-sauce$/, "") === targetSauce ||
        targetSauce.replace(/-sauce$/, "") === titleNormalized
      );
    });

    if (index !== -1) {
      const timer = window.setTimeout(() => {
        transitionRef.current(index);
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [sauceParam]);

  const currentSauce = saucesData[currentIndex];

  const nutritionItems = currentSauce
    ? [
        { label: "Calories", value: currentSauce.cal, unit: " kcal" },
        { label: "Protein", value: currentSauce.protein, unit: " G" },
        { label: "Carbs", value: currentSauce.carbs, unit: " G" },
        { label: "Fat", value: currentSauce.fat, unit: " G" }
      ].filter((item) => item.value && item.value !== "-")
    : [];

  useEffect(() => {
    if (nutritionItems.length <= 1) return;
    const interval = window.setInterval(() => {
      setNutritionIndex((prev) => (prev + 1) % nutritionItems.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [nutritionItems.length, currentIndex]);

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % saucesData.length;
    transitionToIndex(nextIdx);
  };

  const prevSlide = () => {
    const nextIdx = (currentIndex - 1 + saucesData.length) % saucesData.length;
    transitionToIndex(nextIdx);
  };

  const flyVariants = {
    initial: { opacity: 0, scale: 1.15 },
    animate: { opacity: 0.9, scale: 1 },
    exit: { opacity: 0, scale: 1.15 }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const swirlVariants = {
    initial: (direction: "next" | "prev") => ({
      opacity: 0,
      rotate: direction === "next" ? 40 : -40
    }),
    animate: { opacity: 1, rotate: 0 },
    exit: (direction: "next" | "prev") => ({
      opacity: 0,
      rotate: direction === "next" ? -40 : 40
    })
  };

  if (!currentSauce) return null;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <AnimatePresence mode="popLayout">
          {currentSauce.bgSrc ? (
            <motion.div
              key={`bg-${currentSauce.id}`}
              variants={flyVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={styles.bgMotion}
            >
              <Image
                src={currentSauce.bgSrc}
                alt={`${currentSauce.title} background`}
                width={1920}
                height={1080}
                className={`${styles.bgImage} ${isMayoTitle(currentSauce.title) ? styles.bgImageMayo : ""}`}
                priority
              />
              <div className={styles.bgDimMobile} aria-hidden />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className={styles.mobileTopGradient} aria-hidden />

        <div className={styles.textBlock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSauce.id}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={styles.textCol}
            >
              <h1 className={styles.title}>
                {displayHeadingTitle(currentSauce.title)}
              </h1>

              <div className={styles.desc}>
                <p>
                  {isBirdSauce(currentSauce.title)
                    ? birdSauceDescFragments(currentSauce.descLine1)
                    : currentSauce.descLine1}
                  {currentSauce.descLine2 ? (
                    <>
                      <br />
                      {isBirdSauce(currentSauce.title)
                        ? birdSauceDescFragments(currentSauce.descLine2)
                        : currentSauce.descLine2}
                    </>
                  ) : null}
                </p>
                {currentSauce.descLine3 ? (
                  <p className={styles.descExtra}>{currentSauce.descLine3}</p>
                ) : null}
              </div>

              {nutritionItems.length > 0 ? (
                <div className={styles.badgeWrap}>
                  <div className={styles.nutriRow}>
                    <div className={styles.nutriCapsule}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`nutri-${nutritionIndex}-${currentSauce.id}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className={styles.nutriInner}
                        >
                          <span className={styles.nutriLabel}>
                            {nutritionItems[nutritionIndex].label} :
                          </span>
                          <span className={styles.nutriValue}>
                            {nutritionItems[nutritionIndex].value}
                            {nutritionItems[nutritionIndex].unit}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <span className={styles.nutriHint}>Per 100g nutrition</span>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.circleWrap}>
          <div className={styles.ringScale}>
            <motion.div
              animate={{ rotate: baseRotation + rotation }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
              className={styles.ringMotion}
            >
              <div className={styles.ringInteract}>
                <svg
                  viewBox="0 0 1000 1000"
                  className={styles.ringSvg}
                  aria-hidden
                >
                  <defs>
                    <path
                      id="sauce-ring-path-main"
                      d="M 500, 500 m -485, 0 a 485,485 0 1,1 970,0 a 485,485 0 1,1 -970,0"
                      fill="none"
                    />
                  </defs>

                  {ringItems.map((item, ringIndex) => {
                    const isActive = item.index === currentIndex;
                    const offset = ringOffsets[ringIndex] || "0%";
                    const label = ringLabels[ringIndex];
                    return (
                      <text
                        key={item.id}
                        fill="white"
                        textAnchor="middle"
                        className={`${styles.ringText} ${isActive ? styles.ringTextActive : styles.ringTextInactive}`}
                        style={{
                          fontFamily: "SauceDisplay, sans-serif",
                          fontWeight: 700,
                          fontSize: isDesktop ? "1.78rem" : "2.2rem",
                          letterSpacing: isDesktop ? "0.025em" : "0.035em",
                          textTransform: "uppercase",
                          transform: isDesktop ? undefined : "translateY(5px)"
                        }}
                        onClick={() => transitionToIndex(item.index)}
                      >
                        <textPath href="#sauce-ring-path-main" startOffset={offset}>
                          {label}
                        </textPath>
                      </text>
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          </div>

          <svg
            viewBox="0 0 1000 1000"
            className={styles.borderSvg}
            aria-hidden
          >
            <circle
              cx="500"
              cy="500"
              r="470"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
            />
          </svg>

          <div className={styles.bowlClip}>
            <AnimatePresence mode="sync" custom={slideDirection}>
              {currentSauce.bowlSrc ? (
                <motion.div
                  key={`bowl-${currentSauce.id}`}
                  custom={slideDirection}
                  variants={swirlVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={styles.bowlMotion}
                >
                  <Image
                    src={currentSauce.bowlSrc}
                    alt={currentSauce.title}
                    fill
                    className={styles.bowlImage}
                    sizes="(max-width: 640px) 130vw, (max-width: 1024px) 90vw, 80vw"
                    priority
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            onClick={prevSlide}
            className={styles.arrowBtn}
            aria-label="Previous sauce"
          >
            <div className={styles.arrowCircle}>
              <div className={styles.arrowCircleInner}>
                <svg
                  viewBox="0 0 100 100"
                  className={`${styles.arrowIcon} ${styles.arrowIconPrev}`}
                >
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  <path
                    d="M15 25 L50 50 L15 75 L28 50 Z"
                    opacity={0.4}
                  />
                </svg>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className={styles.arrowBtn}
            aria-label="Next sauce"
          >
            <div className={styles.arrowCircle}>
              <div className={styles.arrowCircleInner}>
                <svg viewBox="0 0 100 100" className={styles.arrowIcon}>
                  <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                  <path
                    d="M15 25 L50 50 L15 75 L28 50 Z"
                    opacity={0.4}
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SauceLabPageClient() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading} role="status">
          Preparing sauces…
        </div>
      }
    >
      <SauceSectionContent />
    </Suspense>
  );
}
