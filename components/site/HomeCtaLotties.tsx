"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";

const CTA_ARROW_SRC = "/assets/lottie/cta-arrow-1.lottie";
const CTA_LINE_SRC = "/assets/lottie/cta-line-2-orange.lottie";

/**
 * Brasa `section_cta` ships empty `.cta_lottie-*` divs for Webflow IX Lottie.
 * Mount DotLottie into those nodes so “Come” / “Visit us” decorations play.
 */
export default function HomeCtaLotties() {
  useEffect(() => {
    const mount = (el: HTMLElement, src: string) => {
      const root = createRoot(el);
      root.render(
        <DotLottieReact aria-hidden autoplay className="cta-lottie-dot" loop src={src} />
      );
      return root;
    };

    const roots: Root[] = [];
    const a = document.querySelector(".section_cta .cta_lottie-1");
    const b = document.querySelector(".section_cta .cta_lottie-2");
    if (a instanceof HTMLElement) roots.push(mount(a, CTA_ARROW_SRC));
    if (b instanceof HTMLElement) roots.push(mount(b, CTA_LINE_SRC));

    return () => {
      for (const r of roots) {
        try {
          r.unmount();
        } catch {
          /* already unmounted */
        }
      }
    };
  }, []);

  return null;
}
