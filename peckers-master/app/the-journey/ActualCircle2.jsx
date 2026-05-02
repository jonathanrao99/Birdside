"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PeckersTimeline2({ initialData = [] }) {
  const timelineData = initialData || [];
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getInitial = (i) => {
    if (isDesktop) {
      if (i === 0)
        return {
          opacity: 0,
          x: -100,
          y: -80,
          scale: 0.9,
          rotateY: 25,
          rotate: 5,
          filter: "blur(4px)",
        };
      if (i === 1)
        return {
          opacity: 0,
          y: -120,
          scale: 0.85,
          rotateX: -20,
          filter: "blur(4px)",
        };
      return {
        opacity: 0,
        x: 100,
        y: -80,
        scale: 0.9,
        rotateY: -25,
        rotate: -5,
        filter: "blur(4px)",
      };
    }
    if (i === 0)
      return {
        opacity: 0,
        x: 60,
        y: -60,
        scale: 0.8,
        rotate: 15,
        filter: "blur(4px)",
      };
    if (i === 1)
      return {
        opacity: 0,
        y: -80,
        scale: 0.8,
        rotate: 0,
        filter: "blur(4px)",
      };
    return {
      opacity: 0,
      x: -60,
      y: -60,
      scale: 0.8,
      rotate: -15,
      filter: "blur(4px)",
    };
  };

  if (timelineData.length === 0) return null;

  return (
    <div
      className="bg-transparent text-white relative z-120 flex justify-center mt-0 md:mt-[1.8vw] py-[0.5vw] md:py-0 font-peakers"
      style={{ perspective: "1200px" }} // Safari 3D transform fix
    >
      <div className="w-full max-w-[98vw] relative">
        <div
          className="flex flex-col md:flex-row justify-between gap-[6vw] md:gap-[1.4vw] h-auto md:h-[0.4vw] items-center leading-7 mb-0 md:w-[92vw] mx-auto relative z-120"
          style={{ transformStyle: "preserve-3d" }} // Safari 3D preserve context
        >
          {timelineData.slice(0, 3).map((item, index) => {
            const alignment =
              index === 0
                ? "items-center text-center md:items-end md:text-right"
                : index === 1
                  ? "items-center text-center"
                  : "items-center text-center md:items-start md:text-left";
            const offset =
              index === 1 ? "mt-0 md:mt-[0.35vw]" : "md:mt-[0.5vw]";

            const isHighlighted =
              item.highlight ||
              (!isDesktop &&
                (item.year?.toString() === "2025" ||
                  item.year?.toString().includes("2025")));
            return (
              <motion.div
                key={index}
                initial={getInitial(index)}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotate: 0,
                  z: 0,
                  translateZ: 0, // Explicit GPU hint
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 1.0,
                  delay: 0.6 + index * 0.2, // Slightly faster staggered delay
                  ease: "easeOut",
                }}
                style={{
                  willChange: "transform, opacity, filter",
                  transformStyle: "preserve-3d", // Prevent flattening
                  backfaceVisibility: "hidden",
                  ...(isHighlighted
                    ? {
                      boxShadow:
                        "0 0 25px rgba(234,179,8,0.4), 0 0 50px rgba(234,179,8,0.15)",
                      borderColor: "rgba(234,179,8,0.8)",
                    }
                    : {}),
                }}
                whileHover={
                  isDesktop
                    ? {
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
                    : {}
                }
                className={`relative z-130 px-[6vw] md:px-[1.35vw] py-[6vw] md:py-[1.22vw] rounded-[4vw] md:rounded-[0.95vw] flex flex-col ${alignment} ${offset} w-[80vw] md:w-[19.2vw] h-auto md:min-h-[11.8vw] border
  ${isHighlighted
                    ? "bg-[#121212] border-yellow-500/60"
                    : `bg-[#0a0a0a] ${item.borderStyle || "border-zinc-800"}`
                  }`}
              >
                <span
                  className="text-[5vw] md:text-[20px] lg:text-[1.38vw] text-white font-bold mb-[3vw] md:mb-[0.8vw] tracking-tight"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  {item.year}
                </span>

                <h3 className="text-[5vw] font-bold md:text-[20px] lg:text-[1.36vw] font-peakers mb-[2vw] md:mb-[0.8vw] leading-none text-white uppercase">
                  {item.title}
                </h3>

                <p className="text-white font-sans text-[3vw] md:text-[14px] lg:text-[0.92vw] leading-tight font-medium">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
