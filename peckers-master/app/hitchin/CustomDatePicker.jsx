"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CustomDatePicker({ value, onChange, min, disabled }) {
  const minDate = min ? new Date(min + "T00:00:00") : new Date();
  minDate.setHours(0, 0, 0, 0);

  const selected = value ? new Date(value + "T00:00:00") : null;

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(
    selected ? selected.getFullYear() : minDate.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    selected ? selected.getMonth() : minDate.getMonth(),
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < minDate) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(dateStr);
    setOpen(false);
  };

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < minDate;
  };

  const isSelected = (day) =>
    selected &&
    selected.getFullYear() === viewYear &&
    selected.getMonth() === viewMonth &&
    selected.getDate() === day;

  const isToday = (day) => {
    const t = new Date();
    return (
      t.getFullYear() === viewYear &&
      t.getMonth() === viewMonth &&
      t.getDate() === day
    );
  };

  const displayValue = selected
    ? `${selected.getDate()} ${MONTH_NAMES[selected.getMonth()]} ${selected.getFullYear()}`
    : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`w-full flex items-center justify-between bg-[#111111] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-3 lg:px-6 py-[3vw] md:py-4 lg:py-0 lg:h-[64px] text-[4vw] md:text-[14px] lg:text-[1.1vw] focus:outline-none transition disabled:opacity-50 ${displayValue ? "text-white" : "text-white/40"
          }`}
        style={{ fontFamily: "var(--font-neuzeit)" }}
      >
        <span className="whitespace-nowrap truncate mr-1">{displayValue || "Select a date"}</span>
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Calendar popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-50 top-[calc(100%+8px)] left-0 w-[75vw] md:w-[20vw] bg-[#0e0e0e] border border-[#1F2937] rounded-2xl p-[4vw] md:p-5 shadow-[0_8px_48px_rgba(0,0,0,0.6)]"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-[3vw] md:mb-4">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
              >
                <svg
                  className="w-[4vw] h-[4vw] md:w-4 md:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <span className="text-white text-[3.5vw] md:text-[1vw] font-bold tracking-widest font-mono uppercase">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={goToNextMonth}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
              >
                <svg
                  className="w-[4vw] h-[4vw] md:w-4 md:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-[1.5vw] md:mb-2">
              {DAY_LABELS.map((d) => (
                <span
                  key={d}
                  className="text-center text-[2.8vw] md:text-[0.78vw] text-white/25 font-mono uppercase pb-[1.5vw] md:pb-2"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-[1vw] md:gap-y-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <span key={`gap-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const past = isPast(day);
                  const sel = isSelected(day);
                  const tod = isToday(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayClick(day)}
                      disabled={past}
                      className={[
                        "aspect-square flex items-center justify-center rounded-full",
                        "text-[3vw] md:text-[0.9vw] transition-colors",
                        past
                          ? "text-white/15 cursor-not-allowed"
                          : "hover:bg-white/10 cursor-pointer",
                        sel
                          ? "bg-white! text-black! font-bold"
                          : "text-white/80",
                        tod && !sel ? "ring-1 ring-white/30" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {day}
                    </button>
                  );
                },
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
