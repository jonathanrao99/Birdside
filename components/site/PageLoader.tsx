"use client";

import { useEffect, useState } from "react";
import { PAGE_LOADER_LOGO_SRC } from "@/lib/page-loader-constants";

export type PageLoaderProps = {
  loading: boolean;
  onComplete?: () => void;
};

function motionReduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Full-screen loader. Parent uses `key={pathname}` so each navigation gets a fresh instance
 * with the overlay visible immediately (no layout-effect flash).
 */
export default function PageLoader({ loading, onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const reduced = motionReduced();
    const holdMs = reduced ? 220 : 880;
    const t = window.setTimeout(() => {
      onComplete?.();
    }, holdMs);
    return () => window.clearTimeout(t);
  }, [loading, onComplete]);

  useEffect(() => {
    if (loading) return;
    if (!render) return;
    const reduced = motionReduced();
    const exitMs = reduced ? 0 : 400;
    const raf = requestAnimationFrame(() => {
      setPhase("exit");
    });
    const t = window.setTimeout(() => {
      requestAnimationFrame(() => {
        setRender(false);
        setPhase("enter");
      });
    }, exitMs);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [loading, render]);

  if (!render) return null;

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={`birdside-page-loader ${phase === "exit" ? "birdside-page-loader--exit" : ""}`}
    >
      <div className="birdside-page-loader__logo">
        {/* eslint-disable-next-line @next/next/no-img-element -- static asset; avoids Image + encoded path quirks */}
        <img
          alt=""
          className="birdside-page-loader__logo-img"
          decoding="async"
          src={PAGE_LOADER_LOGO_SRC}
        />
      </div>
    </div>
  );
}
