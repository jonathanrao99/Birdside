"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Operating hours: 11:00 – 23:00
const MIN_HOUR = 11;
const MAX_HOUR = 22; // last selectable hour (22:00–22:45 is within 23:00 close)

const MINUTES = ["00", "15", "30", "45"];

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function CustomTimePicker({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse current value
  const selectedHour = value ? parseInt(value.split(":")[0], 10) : null;
  const selectedMinute = value ? value.split(":")[1] : null;

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hours = Array.from(
    { length: MAX_HOUR - MIN_HOUR + 1 },
    (_, i) => MIN_HOUR + i,
  );

  const handleSelect = (h, m) => {
    onChange(`${pad(h)}:${m}`);
    setOpen(false);
  };

  const displayValue = value
    ? (() => {
      const h = parseInt(value.split(":")[0], 10);
      const m = value.split(":")[1];
      const period = h >= 12 ? "PM" : "AM";
      const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
      return `${display}:${m} ${period}`;
    })()
    : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`w-full flex items-center justify-between bg-[#111111] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-3 lg:px-6 py-[3vw] md:py-4 lg:py-0 lg:h-[64px] text-[4vw] md:text-[14px] lg:text-[1.1vw] focus:outline-none transition disabled:opacity-50 ${displayValue ? "text-white" : "text-white/40"
          }`}
        style={{ fontFamily: "var(--font-neuzeit)" }}
      >
        <span className="whitespace-nowrap truncate mr-1">{displayValue || "Select a time"}</span>
        <svg
          className="w-[4vw] h-[4vw] md:w-4 md:h-4 shrink-0 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-50 top-[calc(100%+8px)] left-0 bg-[#0e0e0e] border border-[#1F2937] rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ minWidth: "100%" }}
          >
            {/* Column headers */}
            <div className="grid grid-cols-2 border-b border-[#1F2937]">
              <span className="text-[2.8vw] md:text-[0.7vw] text-white/30 font-mono uppercase text-center py-[2vw] md:py-2.5 border-r border-[#1F2937]">
                Hour
              </span>
              <span className="text-[2.8vw] md:text-[0.7vw] text-white/30 font-mono uppercase text-center py-[2vw] md:py-2.5">
                Min
              </span>
            </div>

            <div className="grid grid-cols-2">
              {/* Hours column */}
              <div
                data-lenis-prevent
                className="border-r border-[#1F2937] max-h-[48vw] md:max-h-52 overflow-y-auto time-picker-scroll"
              >
                {hours.map((h) => {
                  const period = h >= 12 ? "PM" : "AM";
                  const display = h > 12 ? h - 12 : h;
                  const active = selectedHour === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelect(h, selectedMinute ?? "00")}
                      className={[
                        "w-full text-center py-[2.5vw] md:py-2 text-[3.5vw] md:text-[0.9vw] transition-colors",
                        active
                          ? "bg-white text-black font-bold"
                          : "text-white/70 hover:bg-white/10",
                      ].join(" ")}
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      {display} {period}
                    </button>
                  );
                })}
              </div>

              {/* Minutes column */}
              <div
                data-lenis-prevent
                className="max-h-[48vw] md:max-h-52 overflow-y-auto time-picker-scroll"
              >
                {MINUTES.map((m) => {
                  const active = selectedMinute === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelect(selectedHour ?? MIN_HOUR, m)}
                      className={[
                        "w-full text-center py-[2.5vw] md:py-2 text-[3.5vw] md:text-[0.9vw] transition-colors",
                        active
                          ? "bg-white text-black font-bold"
                          : "text-white/70 hover:bg-white/10",
                      ].join(" ")}
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      :{m}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
