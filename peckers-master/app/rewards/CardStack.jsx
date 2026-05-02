"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbNfc } from "react-icons/tb";

const cards = [
  { id: "gamma", name: "GAMMA", bg: "bg-[#5E1822]", text: "text-white" },
  { id: "beta", name: "BETA", bg: "bg-[#ED641B]", text: "text-white" },
  { id: "alpha", name: "ALPHA", bg: "bg-[#9A0A1D]", text: "text-white" },
  { id: "recruit", name: "RECRUIT", bg: "bg-[#E9C784]", text: "text-white" },
];

export default function CardStack() {
  const [cardsOrder, setCardsOrder] = useState([...cards]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCardsOrder((prev) => {
        // Take the back card (first in array or last) and bring it to the front
        // For 'back card come forth', the array order dictates layer.
        // Let's say index 0 is Back, index 3 is Front.
        // To make the back card come to front, we shift the array:
        // [Back, Mid, Mid, Front] -> [Mid, Mid, Front, Back(now Front)]
        const newArray = [...prev];
        const backCard = newArray.shift(); // remove back card
        newArray.push(backCard); // push to front
        return newArray;
      });
    }, 2500); // 2s gap as requested (plus some time for animation, 2.5s total)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] sm:h-[400px] w-[260px] sm:w-[250px] flex items-center justify-center">
      {cardsOrder.map((card, i) => {
        // i = 0 (Back), 1 (Middle Back), 2 (Middle Front), 3 (Front)
        // Since we physically reorder the array, Framer Motion layout transition will handle the movement!
        const isFront = i === cardsOrder.length - 1;

        // Depth is inverse of i (0 depth = Front)
        const depth = cardsOrder.length - 1 - i;

        // Rotations as per original design: Bottom to Top
        const rotations = [20, 10, 0, -10];
        // x-offset so they fan out slightly
        const xOffsets = [0, -15, -30, -45];
        const yOffsets = [0, 5, 10, 15];

        // Is this the card that just arrived to the front?
        // We can create a nice sweeping-out-and-forward animation
        const isComingForth = depth === 0;

        return (
          <motion.div
            key={card.id}
            initial={false}
            animate={{
              rotate: isComingForth
                ? [-10, 30, rotations[depth]]
                : rotations[depth],
              x: isComingForth
                ? [xOffsets[3], 120, xOffsets[depth]]
                : xOffsets[depth],
              y: isComingForth
                ? [yOffsets[3], -40, yOffsets[depth]]
                : yOffsets[depth],
              scale: isComingForth ? [1 - 3 * 0.05, 1.1, 1] : 1 - depth * 0.05,
              zIndex: i,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              times: isComingForth ? [0, 0.5, 1] : undefined,
            }}
            className={`absolute w-[260px] sm:w-[320px] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] h-[340px]  sm:h-[460px] ${card.bg}`}
          >
            <div className="flex justify-between items-start">
              <span
                className={`${card.text} text-xl sm:text-[22px] tracking-wide uppercase`}
                style={{ fontFamily: "var(--font-peakers)" }}
              >
                PECKERS
              </span>
              <TbNfc className="text-white/80 text-3xl transform rotate-90" />
            </div>
            <span
              className={`${card.text} text-4xl sm:text-5xl uppercase tracking-wider`}
              style={{ fontFamily: "var(--font-peakers)" }}
            >
              {card.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
