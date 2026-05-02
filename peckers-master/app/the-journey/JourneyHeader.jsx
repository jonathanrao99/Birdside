"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from "../../sanity/lib/image";

export default function JourneyIntroSection({ initialData = null }) {
    const [suggestion, setSuggestion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!suggestion.trim()) return;

        setIsSubmitting(true);
        setError(null);

        const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

        if (!sheetUrl) {
            console.error("NEXT_PUBLIC_GOOGLE_SHEET_URL IS NOT DEFINED");
            setError("CONFIGURATION ERROR.");
            setIsSubmitting(false);
            return;
        }

        try {
            await fetch(sheetUrl, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Location: "Suggest a city... (The Journey)",
                    town: suggestion,
                    Date: new Date().toLocaleString()
                })
            });

            // Since it's no-cors, we assume success
            setSubmitted(true);
            setSuggestion("");
        } catch (err) {
            console.error("SUBMISSION ERROR:", err);
            setError("FAILED TO SEND.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const data = initialData;

    if (!data) return null;

    return (
        <section className="w-full bg-black pt-10 md:pt-16 xl:pt-[6vw] pb-0 md:pb-[8vw] flex flex-col items-center text-center relative overflow-hidden min-h-[50vh]">

            <>
                {/* ================= DESKTOP ================= */}
                <div className="hidden xl:block w-full">

                    {/* Main Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-[3.35vw] font-peakers text-white leading-none font-bold tracking-[.05em] mb-[1.6vw]"
                    >
                        {data.heading || "THE PECKERS JOURNEY"}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
                        className="text-[1vw] font-sans text-[#FFD700] tracking-[0.35vw] leading-[1.4] max-w-[60vw] mx-auto"
                    >
                        {data.subtitle || "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES"}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
                        className="w-full relative mt-[4.8vw] isolate"
                    >
                        <div className="w-full relative h-[32vw] transform-gpu" style={{ transform: 'translateZ(0)' }}>
                            {/* SVG Timeline Line */}
                            <div className="relative w-full h-full">
                                <svg
                                    className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] overflow-visible"
                                    viewBox="0 0 1440 463"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g className="drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
                                        <motion.rect
                                            initial={{ width: 0, opacity: 0.95 }}
                                            whileInView={{ width: 1440, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ duration: 3.5, ease: "easeInOut" }}
                                            y="209.5" height="6.75" fill="#FFD700"
                                            style={{ willChange: 'width' }}
                                        />
                                    </g>
                                </svg>

                                {/* Dots and connector bars for desktop Safari compatibility */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[
                                        { left: "21.5%", top: "45.5%", delay: 0.3 },
                                        { left: "51%", top: "45.5%", delay: 0.7 },
                                        { left: "80.8%", top: "45.5%", delay: 1.1 },
                                    ].map((dot, idx) => (
                                        <motion.div
                                            key={`dot-${idx}`}
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ duration: 1.2, delay: dot.delay, ease: "backOut" }}
                                            style={{ left: dot.left, top: dot.top }}
                                            className="absolute -translate-x-1/2 -translate-y-1/2 transform w-[3.2vw] h-[3.2vw] md:w-[2.2vw] md:h-[2.2vw] rounded-full bg-[#FFD700] border-[2px] border-[#121212] shadow-[0_0_18px_rgba(255,215,0,0.8)]"
                                        />
                                    ))}

                                    {[
                                        { left: "21.3%", top: "49.25%", height: "11.55%", delay: 0.5 },
                                        { left: "50.8%", top: "31.1%", height: "16%", delay: 1.2 },
                                        { left: "80.6%", top: "49.25%", height: "11.55%", delay: 2.0 },
                                    ].map((bar, idx) => (
                                        <motion.div
                                            key={`connector-${idx}`}
                                            initial={{ scaleY: 0, opacity: 0.6 }}
                                            whileInView={{ scaleY: 1, opacity: 1 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ duration: 1.5, delay: bar.delay, ease: "easeOut" }}
                                            style={{
                                                left: bar.left,
                                                top: bar.top,
                                                height: bar.height,
                                                transformOrigin: "top",
                                            }}
                                            className="absolute w-[0.35vw] min-w-[6px] bg-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.8)] rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Card 1 - Hitchin (2022) */}
                            {data.timeline?.[0] && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, y: -30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 1.0, delay: 0.5, type: "spring", stiffness: 100 }}
                                    style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
                                    className="absolute left-[21.5%] top-[62%] -translate-x-1/2 z-20 w-[18vw] h-[11vw] rounded-[.7vw] border  border-[#FFD700]/60 pl-[0.8vw] pr-[2vw] py-[2vw] flex flex-col items-start gap-[0vw] bg-black/95 text-left transform-gpu"
                                >
                                    <span className="text-white font-mono text-[2.8vw] font-bold tracking-tight uppercase leading-none mb-[0.5vw]">
                                        {data.timeline[0].year || "2022"}
                                    </span>
                                    <h3 className="text-[4.2vw] text-white font-bold font-peakers tracking-wider leading-none uppercase">
                                        {data.timeline[0].location || "HITCHIN"}
                                    </h3>
                                </motion.div>
                            )}

                            {/* Card 2 - Stevenage (2024) */}
                            {data.timeline?.[1] && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 1.0, delay: 1.2, type: "spring", stiffness: 100 }}
                                    style={{ transformOrigin: "bottom center", willChange: "transform, opacity" }}
                                    className="absolute left-[51%] bottom-[65%] -translate-x-1/2 z-20 w-[18vw] h-[11vw] rounded-[.7vw] border border-[#FFD700]/60 pl-[0.8vw] pr-[2vw] py-[2vw] flex flex-col items-start gap-[0vw] bg-black/95 text-left transform-gpu"
                                >
                                    <span className="text-white font-mono text-[2.8vw] font-bold tracking-tight uppercase leading-none mb-[0.5vw]">
                                        {data.timeline[1].year || "2024"}
                                    </span>
                                    <h3 className="text-[4vw] text-white font-peakers font-bold tracking-wider leading-none uppercase">
                                        {data.timeline[1].location || "STEVENAGE"}
                                    </h3>
                                </motion.div>
                            )}

                            {/* Card 3 - Where Next? */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0, y: -30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 1.0, delay: 1.8, type: "spring", stiffness: 100 }}
                                style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
                                className="absolute left-[80.8%] top-[62%] -translate-x-1/2 z-20 w-[17.5vw] rounded-[.7vw] border border-dashed border-[#FFD700]/60 px-[2vw] py-[1.5vw] flex flex-col items-center gap-[.8vw] bg-black/95 transform-gpu"
                            >
                                <AnimatePresence mode="wait">
                                    {!submitted ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full flex flex-col items-center gap-[.8vw]"
                                        >
                                            <h2 className="text-[1.5vw] text-white font-peakers tracking-[0.35vw] uppercase">
                                                {data.whereNextHeading || "WHERE NEXT ?"}
                                            </h2>

                                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[0.8vw]">
                                                <input
                                                    type="text"
                                                    value={suggestion}
                                                    onChange={(e) => setSuggestion(e.target.value)}
                                                    disabled={isSubmitting}
                                                    placeholder={data.whereNextPlaceholder || "Suggest a city..."}
                                                    className="w-full py-[.6vw] bg-black border border-[#2a2f3a] font-mono text-[0.7vw] text-white placeholder:text-white/40 px-[0.9vw] focus:outline-none disabled:opacity-50"
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || !suggestion.trim()}
                                                    className="w-full h-[2vw] border-[0.15vw] font-mono text-white border-white rounded-[.6vw] text-[0.8vw] tracking-[0.1vw] hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 flex items-center justify-center gap-2"
                                                >
                                                    {isSubmitting ? "SENDING..." : (data.whereNextButtonText || "SUBMIT")}
                                                </button>
                                                {error && <p className="text-red-500 font-mono text-[0.6vw] uppercase">{error}</p>}
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="w-full flex flex-col items-center text-center"
                                        >
                                            <div className="w-[2.5vw] h-[2.5vw] bg-[#FFD700] rounded-full flex items-center justify-center mb-2">
                                                <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13L9 17L19 7" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <h3 className="text-white font-peakers text-[1.2vw] uppercase tracking-wider mb-1">RECEIVED!</h3>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="text-[0.6vw] font-mono text-[#FFD700] underline uppercase hover:text-white transition-colors"
                                            >
                                                SUGGEST MORE
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* ================= MOBILE VERSION ================= */}
                <div className="xl:hidden w-full px-4 sm:px-12 md:px-16 pt-6 md:pt-12">

                    {/* Mobile Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.45 }}
                        className="text-[clamp(2rem,8vw,3.4rem)] md:text-[clamp(2.5rem,6vw,4rem)] font-peakers text-white font-bold mb-5 text-center leading-[0.95]"
                    >
                        {data.heading || "THE PECKERS JOURNEY"}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="text-[clamp(0.68rem,2.8vw,0.9rem)] md:text-[1.1rem] text-[#FFD700] font-mono tracking-[0.28em] leading-[1.45] mb-12 md:mb-16 text-center max-w-2xl mx-auto"
                    >
                        {data.subtitle || "FROM ONE STORE TO GROWING COMMUNITY BRAND - THE JOURNEY CONTINUES"}
                    </motion.p>

                    {/* Timeline */}
                    <div className="relative max-w-xs sm:max-w-md md:max-w-2xl mx-auto w-full transform-gpu">

                        {/* Animated SVG Line for Mobile */}
                        <div className="absolute left-[18px] md:left-[24px] top-0 bottom-0 w-[4px] md:w-[6px] z-20 rounded-full overflow-visible">
                            <div className="absolute inset-0 bg-[#FFD700]/30 rounded-full" />
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, amount: 0.05 }}
                                transition={{ duration: 1.1, ease: "easeOut" }}
                                style={{ originY: 0 }}
                                className="absolute inset-0 rounded-full bg-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.8)]"
                            />
                        </div>

                        {data.timeline?.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.6, delay: idx * 0.06, ease: "easeOut" }}
                                style={{ transformOrigin: "left center" }}
                                className="relative mb-14 md:mb-20 transform-gpu"
                            >
                                {/* Circle Marker - Mobile */}
                                <div className="absolute left-[7px] md:left-[11px] top-2 z-30">
                                    <motion.svg
                                        width="26"
                                        height="26"
                                        viewBox="0 0 45 45"
                                        className="drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                                        initial={{ opacity: 0, scale: 0.88 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        transition={{ duration: 0.4, delay: (idx * 0.08) + 0.04, ease: "easeOut" }}
                                    >
                                        <circle cx="22.5" cy="22.5" r="21" fill="#FFD700" />
                                        <circle cx="22.5" cy="22.5" r="18" stroke="#121212" strokeWidth="4" fill="none" />
                                    </motion.svg>
                                </div>

                                <div className="ml-14 md:ml-20 bg-[#121212] border border-[#333] rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-[#FFD700]/40 transition-colors shadow-lg">
                                    <div className="text-white text-[1rem] md:text-[1.2rem] font-bold opacity-80 mb-1">
                                        {item.year}
                                    </div>
                                    <div className="text-[clamp(1.8rem,8vw,3rem)] md:text-[3rem] text-white font-bold font-peakers uppercase leading-tight">
                                        {item.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* WHERE NEXT */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.6, delay: (data.timeline?.length || 0) * 0.06, ease: "easeOut" }}
                            style={{ transformOrigin: "left center" }}
                            className="relative mb-20 transform-gpu"
                        >
                            <div className="absolute left-[7px] md:left-[11px] top-2 z-30">
                                <motion.svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 45 45"
                                    className={`drop-shadow-[0_0_12px_rgba(255,215,0,0.8)] ${!submitted ? 'animate-pulse' : ''}`}
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.4, delay: ((data.timeline?.length || 0) * 0.08) + 0.04 }}
                                >
                                    <circle cx="22.5" cy="22.5" r="21" fill="#FFD700" />
                                    <circle cx="22.5" cy="22.5" r="18" stroke="#121212" strokeWidth="4" fill="none" />
                                </motion.svg>
                            </div>

                            <div className="ml-14 bg-[#121212] border border-dashed border-[#FFD700]/60 rounded-xl p-6 shadow-xl">
                                <AnimatePresence mode="wait">
                                    {!submitted ? (
                                        <motion.div
                                            key="mobile-form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <h2 className="text-center text-white font-bold tracking-widest text-sm mb-4">
                                                {data.whereNextHeading || "WHERE NEXT?"}
                                            </h2>

                                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                                <input
                                                    type="text"
                                                    value={suggestion}
                                                    onChange={(e) => setSuggestion(e.target.value)}
                                                    disabled={isSubmitting}
                                                    placeholder={data.whereNextPlaceholder || "Suggest a city..."}
                                                    className="bg-black border border-[#333] p-3 rounded-lg text-white focus:outline-none focus:border-[#FFD700] text-sm disabled:opacity-50"
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || !suggestion.trim()}
                                                    className="bg-black text-white py-3 border border-white/20 rounded-full uppercase text-xs tracking-widest hover:border-white transition-all font-bold disabled:opacity-30"
                                                >
                                                    {isSubmitting ? "SENDING..." : (data.whereNextButtonText || "Submit")}
                                                </button>
                                                {error && <p className="text-red-500 font-mono text-[10px] text-center uppercase">{error}</p>}
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="mobile-success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center py-2"
                                        >
                                            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mb-4 text-black">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <h2 className="text-white font-peakers text-2xl mb-1 uppercase tracking-wider">RECEIVED!</h2>
                                            <button
                                                onClick={() => setSubmitted(false)}
                                                className="text-xs font-mono text-[#FFD700] underline uppercase mt-2"
                                            >
                                                Suggest more
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </>
        </section>
    );
}
