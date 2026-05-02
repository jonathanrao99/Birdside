"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

export default function OurStorySection({ initialData = null }) {
  const data = initialData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSubSlide, setCurrentSubSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use slides from Sanity if available, otherwise fallback to default mocked slides
  const slides =
    data?.slides && data.slides.length > 0
      ? data.slides.map((s, idx) => ({ ...s, id: idx + 1 }))
      : data
        ? [
          { ...data, id: 1 },
          {
            ...data,
            id: 2,
            heading: data.heading || "A FAMILY LEGACY, REIMAGINED",
            content: data.content,
          },
          {
            ...data,
            id: 3,
            heading: data.heading || "A FAMILY LEGACY, REIMAGINED",
            content: data.content,
          },
        ]
        : [];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSubSlide(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSubSlide(0);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const bodyVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 16 : -16,
      opacity: 0,
      filter: "blur(1px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir) => ({
      x: dir > 0 ? -16 : 16,
      opacity: 0,
      filter: "blur(1px)",
    }),
  };

  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -20 : 20,
      opacity: 0,
      scale: 0.99,
    }),
  };

  const currentData = slides[currentSlide] || {};
  const fixedHeading =
    slides[0]?.heading || data?.heading || "A FAMILY LEGACY, REIMAGINED";
  const fixedSubHeading =
    slides.find(
      (slide) =>
        typeof slide.subHeading === "string" && slide.subHeading.trim() !== "",
    )?.subHeading ||
    data?.subHeading ||
    data?.subtitle ||
    "";

  // Get images for the current slide (sub-carousel)
  const displayImages =
    currentData.storyImages && currentData.storyImages.length > 0
      ? currentData.storyImages
      : [currentData.founderImage || data?.founderImage].filter(Boolean);

  // Auto-slide internal images
  useEffect(() => {
    if (!data) return;
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSubSlide((prev) => (prev + 1) % displayImages.length);
    }, 5000); // 5 seconds per internal image
    return () => clearInterval(timer);
  }, [data, currentSlide, displayImages.length]);

  if (!data) return null;

  return (
    <section className="relative w-full lg:min-h-0 bg-black px-[1.5vw] pt-[1vh] lg:pt-[5vh] pb-[10vw] md:pb-[12vw] lg:pb-0 mb-0 text-white flex flex-col justify-start items-center lg:overflow-hidden">
      <div className="absolute -top-[15vw] right-0 w-[52%] md:w-1/2 h-[70vw] md:h-auto md:bottom-0 pointer-events-none z-0 overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 560 906"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="opacity-100"
        >
          <rect
            x="0.603188"
            y="0.489236"
            width="719"
            height="925.958"
            transform="matrix(1 0 0.206376 0.978473 -0.100967 -0.989468)"
            fill="#171717"
            stroke="black"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-center justify-center pt-0">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center lg:items-start justify-start lg:justify-center gap-y-6 lg:gap-y-0 lg:gap-x-2">
          <div className="relative w-full lg:w-1/2 px-[5vw] lg:px-[5vw] flex flex-col justify-start mt-[4vw] lg:mt-0 lg:overflow-hidden text-left h-auto min-h-[400px] md:min-h-[480px] lg:h-[450px] xl:h-[72vh]">
            {/* RISE ANIMATION WRAPPER: Synchronizes text with image slides to handle 'dancing' */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-content-${currentSlide}-${currentSubSlide}`}
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0.25, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
                className="h-full min-h-0 flex flex-col"
              >
                <h2 className="font-bold font-peakers text-[7.2vw] md:text-[5.5vw] lg:text-[48px] xl:text-[60px] leading-[1.05] lg:leading-[1.1] uppercase mt-2 lg:mt-0 text-white">
                  {fixedHeading}
                </h2>

                <div
                  className="custom-scrollbar text-[#D1D5DB] font-neuzeit text-[4.5vw] md:text-[20px] lg:text-[18px] xl:text-[1.15vw] leading-[1.3] max-w-full lg:max-w-[40vw] pt-[2vw] md:pt-[12px] lg:pt-[15px] pb-1 h-[48vh] md:h-[35vh] lg:h-auto lg:flex-1 min-h-0 overflow-y-auto !overscroll-auto lg:pr-2"
                  data-lenis-prevent
                >
                  {(() => {
                    const bodyArray = currentData.content || currentData.bodyText;
                    if (!bodyArray) return <p>Content reveal in progress...</p>;
                    const contentString = Array.isArray(bodyArray)
                      ? bodyArray.map((item) => String(item)).join("\n")
                      : String(bodyArray);
                    return <div className="whitespace-pre-wrap break-normal">{contentString}</div>;
                  })()}
                </div>

                <div className="flex items-center justify-start gap-2 lg:gap-2 mt-2 lg:mt-2 pb-0 lg:pb-1 shrink-0">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 lg:h-1 w-10 lg:w-14 transition-all duration-300 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/10"}`}
                    ></div>
                  ))}
                </div>

                {fixedSubHeading && (
                  <p className="text-zinc-500 font-neuzeit text-[4.2vw] md:text-[18px] lg:text-[16px] xl:text-[1.1vw] leading-[1.45] max-w-full lg:max-w-[42vw] mt-2 lg:mt-2 pb-0 shrink-0">
                    {fixedSubHeading}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-1/2 h-auto px-[4vw] lg:px-[2vw] flex flex-col items-start lg:justify-start justify-center mt-6 lg:mt-0">
            <div className="relative w-full h-[60vw] md:h-[50vw] lg:h-[450px] overflow-hidden flex items-center lg:items-start justify-start lg:justify-center px-0 lg:px-4">
              <AnimatePresence mode="wait" custom={direction}>
                {displayImages.length > 0 && (
                  <motion.div
                    key={`image-${currentSlide}-${currentSubSlide}`}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: isMobile ? 0.18 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-0 lg:top-0 left-0 lg:left-0 right-0 lg:right-0 bottom-0 lg:bottom-0 w-full h-full rounded-[1.2vw] overflow-hidden"
                  >
                    <Image
                      src={urlFor(
                        displayImages[currentSubSlide % displayImages.length],
                      )
                        .fit("clip")
                        .url()}
                      alt={`Story Image ${currentSubSlide + 1}`}
                      fill
                      className="object-contain lg:object-top rounded-[1.2vw]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={currentSubSlide === 0}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Image Description */}
            <AnimatePresence mode="wait">
              {(() => {
                const activeImg = displayImages[currentSubSlide % displayImages.length];
                const desc = activeImg?.description;
                if (!desc) return null;
                return (
                  <motion.p
                    key={`description-${currentSlide}-${currentSubSlide}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: isMobile ? 0.2 : 0.4, ease: "easeOut" }}
                    className="mt-2 lg:mt-3 text-[3vw] md:text-[16px] lg:text-[15px] xl:text-[0.95vw] text-white/70 font-neuzeit uppercase tracking-[0.15em] text-center w-full px-0 lg:px-4 leading-snug"
                  >
                    {desc}
                  </motion.p>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons flanking the text section */}
        <button
          onClick={prevSlide}
          className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-50 p-[1vw] group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-[24px] h-[24px] md:w-[48px] md:h-[48px]">
            <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-white/5 md:border md:border-white/10 md:group-hover:border-white/30 md:group-hover:bg-white/10 md:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg
                viewBox="0 0 100 100"
                className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-white rotate-180"
                fill="currentColor"
              >
                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                <path d="M15 25 L50 50 L15 75 L28 50 Z" className="opacity-40" />
              </svg>
            </div>
          </div>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 md:right-4 lg:right-auto lg:left-[calc(50%-3.5vw)] top-1/2 -translate-y-1/2 z-50 p-[1vw] group text-white cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-[24px] h-[24px] md:w-[48px] md:h-[48px]">
            <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-active:scale-90 md:rounded-full md:bg-white/5 md:border md:border-white/10 md:group-hover:border-white/30 md:group-hover:bg-white/10 md:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg
                viewBox="0 0 100 100"
                className="w-[65%] h-[65%] md:w-[45%] md:h-[45%] text-white"
                fill="currentColor"
              >
                <path d="M45 20 L85 50 L45 80 L58 50 Z" />
                <path d="M15 25 L50 50 L15 75 L28 50 Z" className="opacity-40" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

