"use client";

import React, { useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";

export default function PeckersTimeline({ initialData = null }) {
  const timelineData = initialData?.timeline || [];
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (timelineData.length === 0) return null;

  const getInitial = (i) => {
    if (isDesktop) {
      if (i === 0)
        return {
          opacity: 0,
          x: -100,
          y: 80,
          scale: 0.9,
          rotateY: -25,
          rotate: -5,
          filter: "blur(4px)",
        };
      if (i === 1)
        return {
          opacity: 0,
          y: 120,
          scale: 0.85,
          rotateX: 20,
          filter: "blur(4px)",
        };
      return {
        opacity: 0,
        x: 100,
        y: 80,
        scale: 0.9,
        rotateY: 25,
        rotate: 5,
        filter: "blur(4px)",
      };
    }
    if (i === 0)
      return {
        opacity: 0,
        x: 60,
        y: 60,
        scale: 0.8,
        rotate: -15,
        filter: "blur(4px)",
      };
    if (i === 1)
      return { opacity: 0, y: 80, scale: 0.8, rotate: 0, filter: "blur(4px)" };
    return {
      opacity: 0,
      x: -60,
      y: 60,
      scale: 0.8,
      rotate: 15,
      filter: "blur(4px)",
    };
  };

  return (
    <div
      className="bg-transparent z-120 relative text-white flex justify-center py-[0.8vw] md:py-0 font-peakers"
      style={{ perspective: "1200px" }} // Safari 3D transform fix
    >
      <div className="w-full max-w-[98vw] relative mt-[2.7vw] xl:mt-[2.3vw]">
        <motion.div
          initial={{ scaleX: 0, opacity: 0.35 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 3.0, ease: "easeOut" }}
          style={{ transformOrigin: "left center" }}
          className="absolute left-0 right-0 top-1/2 h-0.5 md:h-0.75 min-h-0.5 bg-[#FFD700] rounded-full z-10"
        />
        <div className="absolute left-0 right-0 top-1/2 z-20 flex justify-between pointer-events-none px-[6vw] md:px-[1.35vw] transform -translate-y-1/2">
          {timelineData.slice(0, 3).map((_, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{
                duration: 1.5,
                delay: 0.8 + idx * 0.3,
                ease: "easeOut",
              }}
              className="w-[1.2vw] h-[1.2vw] md:w-[0.95vw] md:h-[0.95vw] rounded-full bg-[#FFD700] border border-[#FFF]/20 shadow-[0_0_20px_rgba(255,215,0,0.50)]"
            />
          ))}
        </div>
        <div
          className="flex flex-col md:flex-row justify-between gap-[6vw] md:gap-[1.4vw] h-auto md:h-[1.1vw] items-center mb-0 md:w-[92vw] mx-auto relative z-120"
          style={{ transformStyle: "preserve-3d" }} // Safari 3D context
        >
          {timelineData.slice(0, 3).map((item, index) => {
            const alignment =
              index === 0
                ? "items-center text-center md:items-end md:text-right"
                : index === 1
                  ? "items-center text-center"
                  : "items-center text-center md:items-start md:text-left";
            const offset =
              index === 0 || index === 2 ? "md:mt-[0.3vw]" : "md:-mt-[0.1vw]";

            const isHighlighted =
              item.highlight ||
              (!isDesktop && item.year?.toString() === "1978");

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
                  delay: 0.3 + index * 0.2,
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
                  className="text-[5vw] md:text-[20px] lg:text-[1.38vw] font-bold mb-[3vw] md:mb-[0.8vw] tracking-tight text-white"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  {item.year}
                </span>

                <h3 className="text-[5vw] font-bold md:text-[20px] lg:text-[1.36vw] font-peakers mb-[2vw] md:mb-[0.8vw] leading-tight text-white uppercase">
                  {item.title}
                </h3>

                <p
                  className={`text-white font-sans leading-tight font-medium ${index === 1 ? "text-[2.8vw] md:text-[13px] lg:text-[0.86vw]" : "text-[3vw] md:text-[14px] lg:text-[0.92vw]"}`}
                >
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
