"use client";

/**
 * Route overlay: enter/exit via `motion/react`. Shell visibility remains CSS
 * (`.birdside-page-transition-shell` in app/globals.css) — do not duplicate shell fade here.
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { PAGE_LOADER_LOGO_SRC } from "@/lib/page-loader-constants";

const LOADER_EXIT_EASE = [0.33, 1, 0.32, 1] as const;
const LOADER_LOGO_EASE = [0.34, 1.56, 0.64, 1] as const;

export type PageLoaderProps = {
  loading: boolean;
  onComplete?: () => void;
};

/**
 * Full-screen loader. Parent uses `key={pathname}` so each navigation gets a fresh instance
 * with the overlay visible immediately (no layout-effect flash).
 */
export default function PageLoader({ loading, onComplete }: PageLoaderProps) {
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    if (!loading) return;
    const holdMs = reduced ? 220 : 880;
    const t = window.setTimeout(() => {
      onComplete?.();
    }, holdMs);
    return () => window.clearTimeout(t);
  }, [loading, onComplete, reduced]);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="birdside-page-loader"
          aria-busy="true"
          aria-live="polite"
          className="birdside-page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.4,
            ease: LOADER_EXIT_EASE
          }}
        >
          <motion.div
            className="birdside-page-loader__logo"
            initial={reduced ? false : { opacity: 0, scale: 0.35 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.55, ease: LOADER_LOGO_EASE }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static asset; avoids Image + encoded path quirks */}
            <img
              alt=""
              className="birdside-page-loader__logo-img"
              decoding="async"
              src={PAGE_LOADER_LOGO_SRC}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
