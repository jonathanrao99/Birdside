import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

function SauceSectionContent({ initialData = [] }) {
  const searchParams = useSearchParams();
  const sauceParam = searchParams.get("sauce");
  
  const [fetchedSaucesData, setFetchedSaucesData] = useState([]);
  const [isFetching, setIsFetching] = useState(initialData.length === 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [rotation, setRotation] = useState(0);
  const [nutritionIndex, setNutritionIndex] = useState(0);

  const saucesData = initialData.length > 0 ? initialData : fetchedSaucesData;
  const loading = initialData.length === 0 && isFetching;

  // Handle deep linking from query param
  useEffect(() => {
    // We only want to auto-navigate on initial load when sauces are ready
    if (sauceParam && saucesData.length > 0) {
      const targetSauce = sauceParam.toLowerCase();
      const index = saucesData.findIndex(s => {
        const titleNormalized = s.title?.toLowerCase().trim().replace(/\s+/g, '-');
        // Match exact, or if one contains the other (e.g. "buffalo" vs "buffalo-sauce")
        return titleNormalized === targetSauce || 
               titleNormalized.replace(/-sauce$/, '') === targetSauce ||
               targetSauce.replace(/-sauce$/, '') === titleNormalized;
      });
      
      if (index !== -1 && index !== currentIndex) {
        // Use a small timeout to ensure the component is fully ready for the GSAP/Framer transition
        const timer = setTimeout(() => {
          transitionToIndex(index);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [sauceParam, saucesData.length]); // Only run when data is ready or param changes

  useEffect(() => {
    if (initialData && initialData.length > 0) return;

    const fetchSauces = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "saucePage"] | order(_createdAt asc)`,
        );
        setFetchedSaucesData(data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching sauces:", error);
        setIsFetching(false);
      }
    };
    fetchSauces();
  }, [initialData]);

  const currentSauce = saucesData[currentIndex];

  const nutritionItems = currentSauce ? [
    { label: "Calories", value: currentSauce.cal, unit: " kcal" },
    { label: "Protein", value: currentSauce.protein, unit: " G" },
    { label: "Carbs", value: currentSauce.carbs, unit: " G" },
    { label: "Fat", value: currentSauce.fat, unit: " G" },
  ].filter(item => item.value && item.value !== "-") : [];

  useEffect(() => {
    if (nutritionItems.length <= 1) return;
    const interval = setInterval(() => {
      setNutritionIndex((prev) => (prev + 1) % nutritionItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [nutritionItems.length, currentIndex]);

  useEffect(() => {
    setNutritionIndex(0);
  }, [currentIndex]);

  const ringItemsBase =
    saucesData.length > 1
      ? [
        { sauce: saucesData[0], index: 0 },
        ...saucesData
          .slice(1)
          .map((sauce, index) => ({ sauce, index: index + 1 }))
          .reverse(),
      ]
      : saucesData.map((sauce, index) => ({ sauce, index }));
  const ringItems = ringItemsBase.map((item, idx) => ({
    ...item,
    id: `ring-item-${item.index}-${idx}`,
  }));

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  const ringGapUnits = isDesktop ? 0 : 2.25;

  const ringLabels = ringItems.map((item) => {
    let title = (item.sauce?.title || "")
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();
    if (title.startsWith("AYONNAISE")) title = "M" + title;
    const baseTitle = title.replace(/\s*SAUCE$/, "").trim();

    let finalTitle = baseTitle;
    if (baseTitle.includes("MAYO") || baseTitle.includes("MAYONNAISE")) {
      finalTitle = "HOUSE MAYO";
    } else if (["CHEESE", "BUFFALO", "BUFFLO", "BUFFLAO"].includes(baseTitle)) {
      finalTitle = baseTitle + " SAUCE";
    }

    return `• ${finalTitle} •`;
  });

  const ringLayout = ringLabels.reduce(
    (acc, label) => {
      const start = acc.cursor;
      const center = start + label.length / 2;
      return {
        cursor: start + label.length + ringGapUnits,
        starts: [...acc.starts, start],
        centers: [...acc.centers, center],
      };
    },
    { cursor: 0, starts: [], centers: [] },
  );

  const ringTotalUnits = Math.max(ringLayout.cursor, 1);
  const ringStartOffsetsData = ringLayout.starts.map(
    (start) => (start / ringTotalUnits) * 100,
  );
  const ringCenterOffsetsData = ringLayout.centers.map(
    (center) => (center / ringTotalUnits) * 100,
  );
  const ringOffsets = ringCenterOffsetsData.map((offset) => `${offset}%`);
  const baseRotation = 90 - (ringCenterOffsetsData[0] || 0) * 3.6;

  const transitionToIndex = (targetIndex) => {
    if (!saucesData.length || targetIndex === currentIndex) return;

    const targetRingIndices = ringItems
      .map((item, idx) => (item.index === targetIndex ? idx : -1))
      .filter((idx) => idx !== -1);

    const currentRingIdx = ringItems.findIndex(
      (item) => item.index === currentIndex,
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

    setSlideDirection(bestDelta > 0 ? "next" : "prev");
    setCurrentIndex(targetIndex);
    setRotation((prev) => prev - bestDelta);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % saucesData.length;
    setSlideDirection("next");
    transitionToIndex(nextIdx);
  };

  const prevSlide = () => {
    const nextIdx = (currentIndex - 1 + saucesData.length) % saucesData.length;
    setSlideDirection("prev");
    transitionToIndex(nextIdx);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">
          Loading Sauces...
        </div>
      </div>
    );
  }

  if (!saucesData || saucesData.length === 0) return null;

  const flyVariants = {
    initial: { opacity: 0, scale: 1.15 },
    animate: { opacity: 0.9, scale: 1 },
    exit: { opacity: 0, scale: 1.15 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const swirlVariants = {
    initial: (direction) => ({
      opacity: 0,
      rotate: direction === "next" ? 40 : -40,
    }),
    animate: { opacity: 1, rotate: 0 },
    exit: (direction) => ({
      opacity: 0,
      rotate: direction === "next" ? -40 : 40,
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex flex-col items-center">
      <div className="relative w-full h-full flex flex-col items-center">
        {/* BACKGROUND IMAGE WITH ANIMATE PRESENCE */}
        <AnimatePresence mode="popLayout">
          {currentSauce.bgImage && (
            <motion.div
              key={"bg-" + currentSauce._id}
              variants={flyVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full z-0"
            >
              <Image
                src={urlFor(currentSauce.bgImage).url()}
                alt={`${currentSauce.title} Background`}
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
                style={{
                  transform: currentSauce.title
                    ?.toLowerCase()
                    .includes("mayonnaise")
                    ? "scale(1.1) translateX(-5%)"
                    : "scale(1)",
                  transformOrigin: "center center",
                  objectPosition: currentSauce.title
                    ?.toLowerCase()
                    .includes("mayonnaise")
                    ? "25% center"
                    : "center center",
                }}
                priority
              />
              {/* Darken bg on mobile so text stays readable */}
              <div className="absolute inset-0 bg-black/65 md:hidden" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE GRADIENT — keeps text legible over the bg image */}
        <div className="absolute top-0 left-0 right-0 h-[48%] bg-gradient-to-b from-black via-black/75 to-transparent z-[9] pointer-events-none md:hidden" />

        {/* TEXT SECTION */}
        <div className="absolute top-[1.2rem] sm:top-[1.4rem] md:top-28 lg:top-32 xl:top-4 left-1/2 -translate-x-1/2 text-center text-white w-[95%] sm:w-[90%] md:w-[65%] lg:w-[55%] xl:w-[48%] z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={"text-" + currentSauce._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* TITLE */}
              <h1
                className="text-4xl sm:text-5xl md:text-[64px] lg:text-[72px] xl:text-[4vw] font-bold tracking-wide mb-2 sm:mb-3 md:mb-2"
                style={{ fontFamily: "var(--font-peakers)" }}
              >
                {(() => {
                  const title = currentSauce.title?.toUpperCase().trim() || "";
                  const baseTitle = title.replace(/\s*SAUCE$/i, "").trim();
                  if (baseTitle.includes("MAYO") || baseTitle.includes("MAYONNAISE")) {
                    return "HOUSE MAYO";
                  }
                  if (["CHEESE", "BUFFALO", "BUFFLO", "BUFFLAO"].includes(baseTitle)) {
                    return baseTitle + " SAUCE";
                  }
                  return baseTitle;
                })()}
              </h1>

              {/* DESCRIPTION */}
              <div
                className="text-[13px] sm:text-[14px] md:text-[18px] lg:text-[20px] xl:text-[0.9vw] leading-[1.6em] font-bold tracking-wider space-y-1"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                <p>
                  {currentSauce.descLine1}
                  <br />
                  {currentSauce.descLine2}
                </p>
                <p className="hidden sm:block">{currentSauce.descLine3}</p>
              </div>

              {/* FRESHLY MADE BADGE */}
              <div className="flex flex-col items-center mt-3 md:mt-4 xl:mt-[0.8vw]">
                <div className="mb-2">
                  <div className="px-3 sm:px-4 md:px-6 lg:px-6 xl:px-[1vw] py-1 md:py-2.5 lg:py-2.5 xl:py-[0.35vw] rounded-[100px] border border-white/20 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 xl:gap-[0.5vw] bg-black/30 backdrop-blur-md">
                    <span
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                      className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[0.8vw] font-bold tracking-[0.07em] uppercase translate-y-px"
                    >
                      FRESHLY MADE IN-HOUSE EVERY DAY | NO ADDED PRESERVATIVES
                      UNLIKE THE BIG BOYS
                    </span>
                  </div>
                </div>

                {/* NUTRITIONAL BADGES - ANIMATED CAPSULE */}
                {nutritionItems.length > 0 && (
                  <div className="flex items-center justify-center gap-4 mt-3 md:mt-4">
                    <div className="relative h-[32px] sm:h-[36px] md:h-[40px] lg:h-[2.2vw] xl:h-[2.2vw] w-[180px] sm:w-[220px] md:w-[260px] lg:w-[13vw] xl:w-[13vw] overflow-hidden rounded-[100px] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`nutri-${nutritionIndex}-${currentSauce._id}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="flex items-center justify-center gap-1.5 md:gap-[0.4vw] font-bold"
                        >
                          <span className="text-[12px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[0.9vw] text-[#F2DF0D] uppercase tracking-wider">
                            {nutritionItems[nutritionIndex].label} :
                          </span>
                          <span className="text-[12px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[0.9vw] text-white uppercase tracking-wider">
                            {nutritionItems[nutritionIndex].value}
                            {nutritionItems[nutritionIndex].unit}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <span
                      className="text-[11px] pt-[3px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[0.8vw] text-white/50 font-bold uppercase tracking-[0.15em] whitespace-nowrap leading-none"
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      Per 100g nutrition
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/*
          ─── CIRCLE CONTAINER ───
        */}
        <div
          className="fixed md:absolute left-1/2 -translate-x-1/2
                      top-[min(46vh,19rem)] sm:top-[min(46vh,19rem)] md:top-auto md:bottom-[-25%] lg:top-[25rem] lg:bottom-auto xl:top-[13.5rem] xl:mt-[2vw]
                      w-[190vw] h-[190vw]
                      sm:w-[160vw] sm:h-[160vw]
                      md:w-[110vw] md:h-[110vw]
                      lg:w-[62vw] lg:h-[65vw] 
                      xl:w-[70vw] xl:h-[70vw]
                      flex items-center justify-center z-10 pointer-events-none"
        >
          {/* ROTATING SAUCE NAME RING */}
          <div className="absolute inset-0 md:scale-[0.96] md:origin-center">
            <motion.div
              animate={{ rotate: baseRotation + rotation }}
              transition={{ ease: "easeInOut", duration: 0.6 }}
              className="absolute inset-0 z-30 w-full h-full"
            >
              <div className="relative w-full h-full pointer-events-auto z-20">
                <svg
                  viewBox="0 0 1000 1000"
                  className="w-full h-full overflow-visible"
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
                        className={`${isActive ? "opacity-100" : "opacity-30 hover:opacity-70"} sauce-circular-text transition-opacity duration-300`}
                        style={{
                          fontFamily: "var(--font-peakers)",
                          fontWeight: 700,
                          fontSize: isDesktop ? "0.45rem" : "0.62rem",
                          letterSpacing: isDesktop ? "0.015em" : "0.02em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          pointerEvents: "auto",
                          transform: isDesktop ? "" : "translateY(5px)",
                        }}
                        onClick={() => transitionToIndex(item.index)}
                      >
                        <textPath
                          href="#sauce-ring-path-main"
                          startOffset={offset}
                        >
                          {label}
                        </textPath>
                      </text>
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          </div>

          {/* STATIC BORDER CIRCLE */}
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 top-4 w-full h-full pointer-events-none z-10 md:scale-[0.96] md:origin-center"
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

          {/* SAUCE IMAGE — cropped circle */}
          <div className="absolute left-1/2 mt-2 md:mt-6 top-[48%] md:top-1/2 z-10 h-[108%] w-[108%] md:h-[114%] md:w-[114%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
            <AnimatePresence mode="sync" custom={slideDirection}>
              {currentSauce.sauceImage && (
                <motion.div
                  key={"bowl-" + currentSauce._id}
                  custom={slideDirection}
                  variants={swirlVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{ transformOrigin: "center center" }}
                >
                  <Image
                    src={urlFor(currentSauce.sauceImage)
                      .width(1400)
                      .height(1400)
                      .fit("crop")
                      .crop("center")
                      .url()}
                    alt={currentSauce.title}
                    fill
                    className="select-none object-cover object-center"
                    style={{
                      filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.95))",
                      transformOrigin: "center center",
                    }}
                    priority
                    sizes="(max-width: 640px) 130vw, (max-width: 1024px) 90vw, 80vw"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/*
              ─── ARROW BUTTONS ───
      */}
        <div className="absolute top-[63%] sm:top-[65%] md:top-[60%] lg:top-auto bottom-auto md:bottom-auto lg:bottom-[8%] xl:bottom-[18%] w-[94%] sm:w-[92%] md:w-[90%] lg:w-[92%] xl:w-[88%] left-1/2 -translate-x-1/2 flex justify-between items-center z-40 pointer-events-none">
          <button
            onClick={prevSlide}
            className="group pointer-events-auto transition-all duration-300 active:scale-95"
            aria-label="Previous sauce"
          >
            <div className="relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-12 md:w-[68px] md:h-[68px] lg:w-[80px] lg:h-[80px]">
              <div className="w-full h-full rounded-full bg-white/10 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[45%] h-[45%] text-white rotate-180"
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
            onClick={nextSlide}
            className="group pointer-events-auto transition-all duration-300 active:scale-95"
            aria-label="Next sauce"
          >
            <div className="relative flex items-center justify-center w-[44px] h-[44px] sm:w-[48px] sm:h-12 md:w-[68px] md:h-[68px] lg:w-[80px] lg:h-[80px]">
              <div className="w-full h-full rounded-full bg-white/10 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[45%] h-[45%] text-white"
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
        </div>
      </div>
    </div>
  );
}

export default function SaucePageOne(props) {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">
          Preparing Sauces...
        </div>
      </div>
    }>
      <SauceSectionContent {...props} />
    </Suspense>
  );
}
