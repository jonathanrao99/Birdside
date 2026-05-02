"use client";

import React from "react";
import { motion } from "framer-motion";

const ArrowLeftToRight = () => {
  return (
    <div className="w-full h-15 flex justify-center -my-2 opacity-95 z-20 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 80 0 C 80 40, 220 40, 220 70"
          stroke="#71717a"
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 214 62 L 220 74 L 226 62"
          fill="none"
          stroke="#71717a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const ArrowRightToLeft = () => {
  return (
    <div className="w-full h-15 flex justify-center -my-2 opacity-95 z-20 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 220 0 C 220 40, 80 40, 80 70"
          stroke="#71717a"
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 74 62 L 80 74 L 86 62"
          fill="none"
          stroke="#71717a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default function MobileRoadmap({ initialData = null }) {
  const roadmapData = initialData;

  if (!roadmapData) return null;

  return (
    <section className="block lg:hidden w-full bg-black text-white px-[4vw] md:px-[8vw] pt-0 md:pt-4 mt-2 md:mt-12 pb-[10vw] md:pb-[15vw] overflow-hidden relative z-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full mt-[4vw] mb-[5vw] md:mb-12"
      >
        <h2 className="text-[7.5vw] md:text-[6vw] xl:text-[4vw] text-center font-bold leading-none font-peakers px-[1vw] tracking-wide mb-[2vw] md:mb-[1.5vw] uppercase">
          {roadmapData.heading || "A LEGACY THAT CAME FULL CIRCLE"}
        </h2>
        <span className="text-white/60 tracking-widest font-sans text-[4vw] md:text-[1.2rem] xl:text-[1.5vw]">
          {roadmapData.estYear || "EST. 1978"}
        </span>
        <div className="w-full h-px bg-[#1F2937] mt-[4vw] md:mt-8"></div>
      </motion.div>

      {/* Timeline container */}
      <div className="flex flex-col w-full relative">
        {roadmapData.timeline?.map((item, index) => {
          const isRight = index % 2 === 1; // 0=Left, 1=Right, 2=Left, 3=Right...
          const isHighlighted =
            item.highlight ||
            item.year?.toString().includes("1978") ||
            item.year?.toString().includes("2025");

          return (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`w-full flex ${isRight ? "justify-end" : "justify-start"} z-10`}
              >
                <div
                  style={
                    isHighlighted
                      ? {
                        boxShadow:
                          "0 0 25px rgba(234,179,8,0.4), 0 0 50px rgba(234,179,8,0.15)",
                        borderColor: "rgba(234,179,8,0.8)",
                      }
                      : {}
                  }
                  className={`relative px-[5vw] md:px-[6vw] xl:px-[3vw] py-[6vw] md:py-[6vw] xl:py-[3vw] rounded-[4vw] md:rounded-[2.5vw] xl:rounded-[1.5vw] flex flex-col items-center text-center w-[65vw] md:w-[48vw] xl:w-[35vw] border
                                        ${isHighlighted
                      ? "bg-[#121212] border-yellow-500/60"
                      : `bg-[#0a0a0a] ${item.borderStyle || "border-zinc-800"}`
                    }`}
                >
                  <span
                    className="text-[4.5vw] md:text-[1.4rem] xl:text-[2vw] font-bold mb-[2vw] md:mb-[1.5vw] tracking-tight text-white"
                    style={{ fontFamily: "var(--font-neuzeit)" }}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-[4.5vw] md:text-[1.8rem] xl:text-[2.2vw] font-peakers mb-[2vw] md:mb-[1.5vw] leading-tight text-white font-bold uppercase transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-peakers text-[3.5vw] md:text-[1.1rem] xl:text-[1.5vw] leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Insert appropriate arrow */}
              {index < roadmapData.timeline.length - 1 &&
                (isRight ? <ArrowRightToLeft /> : <ArrowLeftToRight />)}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Divider */}
      <div className="w-full flex justify-center mt-[4vw]">
        <div className="w-full h-px bg-[#1F2937]"></div>
      </div>
    </section>
  );
}
