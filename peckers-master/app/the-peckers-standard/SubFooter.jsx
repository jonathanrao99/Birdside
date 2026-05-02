import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const SubFooter = () => {
  const glossRef1 = useRef(null);
  const glossRef2 = useRef(null);

  useEffect(() => {
    const refs = [glossRef1, glossRef2];
    const loops = refs.map((ref, index) => {
      const gloss = ref.current;
      if (!gloss) return null;
      gsap.set(gloss, { left: "-60%", opacity: 0.34 });
      return gsap.to(gloss, {
        left: "120%",
        opacity: 0.54,
        duration: 1.3,
        repeat: -1,
        ease: "power2.inOut",
        yoyo: false,
        delay: 0.3 + index * 0.2, // Stagger the gloss start slightly
        onRepeat: () => {
          gsap.set(gloss, { left: "-60%", opacity: 0.34 });
        },
      });
    });

    return () => loops.forEach((loop) => loop && loop.kill());
  }, []);
  return (
    <section className="relative w-full h-[50vh] md:h-[80vh] bg-black text-white">
      {/* CENTERED CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: "-40%",
          x: "-50%",
          filter: "blur(10px)",
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: "-50%",
          x: "-50%",
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 text-center w-[90vw] md:w-auto flex flex-col items-center"
      >
        {/* TEXT TITLE */}
        <div className="w-[85vw] md:w-auto mb-[8vw] md:mb-[3vw] mx-auto flex justify-center">
          <span
            className="font-mono text-[8vw] md:text-[3vw] tracking-wider font-bold uppercase"
            style={{
              letterSpacing: "0.08em",
              lineHeight: 1,
              color: "white",
              textShadow: "0 2px 24px #000A, 0 0px 0 #fff",
              WebkitTextStroke: "1px #fff",
            }}
          >
            MICRO MARKETPLACE
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-[4vw] md:gap-4 py-0 w-[85vw] md:w-auto items-center justify-center">
          <motion.div
            style={{ position: "relative", width: "100%" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "backOut", delay: 0.1 }}
            className="md:w-auto"
          >
            <a
              href="https://peckers.vmos.io/store/store-selection?app=online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffff] w-full md:w-auto px-[4vw] md:px-[1.6vw] py-[3.4vw] md:py-[.8vw] rounded-[2vw] md:rounded-[0.8vw] text-[4vw] md:text-[1.4vw] tracking-wide transition-all duration-300 hover:bg-[#232323] hover:scale-[1.04] relative overflow-hidden whitespace-nowrap block text-center no-underline"
              style={{
                fontFamily: "var(--font-neuzeit)",
                border: "2px solid #fff",
                backgroundClip: "padding-box",
              }}
            >
              <span
                ref={glossRef1}
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "-60%",
                  width: "40%",
                  height: "165%",
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.6) 48%, rgba(255,255,255,0.1) 80%)",
                  filter: "blur(0.05vw)",
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  opacity: 0.44,
                  zIndex: 2,
                  transform: "rotate(-14deg)",
                }}
              ></span>
              <span style={{ position: "relative", zIndex: 3 }}>
                CLICK & COLLECT
              </span>
            </a>
          </motion.div>

          <motion.div
            style={{ position: "relative", width: "100%" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "backOut", delay: 0.2 }}
            className="md:w-auto"
          >
            <a
              href="https://peckers.vmos.io/store/store-selection?app=delivery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black w-full md:w-auto px-[4vw] md:px-[2.9vw] font-bold py-[3.5vw] md:py-[.8vw] rounded-[2vw] md:rounded-[0.8vw] text-[4vw] md:text-[1.4vw] tracking-wide transition-all duration-300 hover:bg-[#ffff] bg-[#ffff] hover:scale-[1.04] relative overflow-hidden whitespace-nowrap block text-center no-underline"
              style={{
                fontFamily: "var(--font-neuzeit)",
                border: "1px solid #333",
                backgroundClip: "padding-box",
              }}
            >
              <span
                ref={glossRef2}
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "-60%",
                  width: "44%",
                  height: "165%",
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.6) 48%, rgba(255,255,255,0.1) 80%)",
                  filter: "blur(0.05vw)",
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  opacity: 0.3, // Slightly lower for white background
                  zIndex: 2,
                  transform: "rotate(-14deg)",
                }}
              ></span>
              <span style={{ position: "relative", zIndex: 3 }}>DELIVERY</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SubFooter;
