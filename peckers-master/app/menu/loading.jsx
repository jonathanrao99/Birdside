"use client";

import { motion } from "framer-motion";

export default function MenuLoading() {
  return (
    <div className="relative min-h-[68vh] bg-black overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-[42%] h-90 w-90 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(234,179,8,0.24) 0%, rgba(234,179,8,0.08) 36%, rgba(0,0,0,0) 72%)",
          }}
          initial={{ opacity: 0.25, scale: 0.92 }}
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.92, 1.04, 0.92] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="mx-auto mb-8 flex w-full items-end justify-center gap-3 md:gap-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-24 w-20 rounded-2xl border border-[#EAB308]/35 bg-[#121212] md:h-32 md:w-28"
              initial={{ opacity: 0.35, y: 10, scale: 0.95 }}
              animate={{ opacity: [0.35, 0.8, 0.35], y: [10, 0, 10], scale: [0.95, 1, 0.95] }}
              transition={{
                duration: 0.95,
                delay: i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="mx-auto h-5 w-56 rounded-full bg-white/15 md:w-72"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
