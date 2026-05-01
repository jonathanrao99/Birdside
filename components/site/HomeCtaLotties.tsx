"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";

const CTA_ARROW_SRC = "/assets/lottie/cta-arrow-1.lottie";
const CTA_LINE_SRC = "/assets/lottie/cta-line-2-orange.lottie";

/**
 * Brasa `section_cta` ships empty `.cta_lottie-*` divs for Webflow IX Lottie.
 * Mount DotLottie into those nodes so “Come” / “Visit us” decorations play.
 *
 * All `createRoot` / `root.unmount()` work is deferred with `setTimeout(0)` so it never
 * runs synchronously during React’s render or effect flush (avoids nested-root races).
 */
export default function HomeCtaLotties() {
  const rootsRef = useRef<Root[]>([]);

  useEffect(() => {
    let cancelled = false;

    const mountTimer = window.setTimeout(() => {
      if (cancelled) return;

      for (const r of rootsRef.current) {
        try {
          r.unmount();
        } catch {
          /* already unmounted */
        }
      }
      rootsRef.current = [];

      const mount = (el: HTMLElement, src: string) => {
        const root = createRoot(el);
        root.render(
          <DotLottieReact aria-hidden autoplay className="cta-lottie-dot" loop src={src} />
        );
        rootsRef.current.push(root);
        return root;
      };

      const a = document.querySelector(".section_cta .cta_lottie-1");
      const b = document.querySelector(".section_cta .cta_lottie-2");
      if (a instanceof HTMLElement) mount(a, CTA_ARROW_SRC);
      if (b instanceof HTMLElement) mount(b, CTA_LINE_SRC);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(mountTimer);

      const snapshot = rootsRef.current.slice();
      window.setTimeout(() => {
        for (const r of snapshot) {
          try {
            r.unmount();
          } catch {
            /* already unmounted */
          }
        }
        rootsRef.current = [];
      }, 0);
    };
  }, []);

  return null;
}
