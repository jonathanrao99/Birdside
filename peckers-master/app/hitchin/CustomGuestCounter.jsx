"use client";

const MIN = 1;
const MAX = 500;

export default function CustomGuestCounter({ value, onChange, disabled }) {
  const num = value === "" ? "" : parseInt(value, 10);

  const decrement = () => {
    if (disabled) return;
    if (num === "" || num <= MIN) return;
    onChange(String(num - 1));
  };

  const increment = () => {
    if (disabled) return;
    if (num === "") {
      onChange(String(MIN));
      return;
    }
    if (num >= MAX) return;
    onChange(String(num + 1));
  };

  const handleInput = (e) => {
    if (disabled) return;
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      onChange("");
      return;
    }
    const parsed = parseInt(raw, 10);
    if (parsed >= 0 && parsed <= MAX) onChange(String(parsed));
  };

  return (
    <div
      className={`flex items-center justify-between bg-[#111111] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-[0.6rem] lg:py-0 lg:h-[64px] transition ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {/* Value / text input */}
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInput}
        placeholder="Est."
        disabled={disabled}
        className="bg-transparent text-[4vw] md:text-[14px] text-white placeholder-white/40 focus:outline-none w-full min-w-0"
        style={{ fontFamily: "var(--font-neuzeit)" }}
      />

      {/* Custom +/− buttons */}
      <div className="flex flex-col gap-px ml-2 shrink-0">
        <button
          type="button"
          onClick={increment}
          disabled={disabled || num >= MAX}
          aria-label="Increase guests"
          className="flex items-center justify-center w-[5vw] h-[4vw] md:w-5 md:h-4 rounded-sm text-white/40 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            viewBox="0 0 10 6"
            className="w-[2.5vw] md:w-2.5"
            fill="currentColor"
          >
            <path d="M5 0L10 6H0L5 0Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value === "" || num <= MIN}
          aria-label="Decrease guests"
          className="flex items-center justify-center w-[5vw] h-[4vw] md:w-5 md:h-4 rounded-sm text-white/40 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            viewBox="0 0 10 6"
            className="w-[2.5vw] md:w-2.5"
            fill="currentColor"
          >
            <path d="M5 6L0 0H10L5 6Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
