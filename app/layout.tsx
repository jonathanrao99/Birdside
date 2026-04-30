import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Birdside HTX",
  description: "Wings, sandos, and late-night flavor — Birdside HTX in Katy, TX."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e30119"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- static shared stylesheet loaded once globally */}
        <link href="/vendor/brasa-template.shared.38e119549.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script id="cta-scroll-grow" strategy="afterInteractive">
          {`(() => {
  const setupCtaScroll = () => {
    const section = document.querySelector(".section_cta");
    const wrapper = document.querySelector(".section_cta .cta_wrapper");
    if (!section || !wrapper) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.style.setProperty("--cta-progress", "1");
      section.style.setProperty("--cta-pop", "1");
      section.classList.add("is-cta-pop");
      return;
    }

    let ticking = false;
    let lastProgress = -1;
    let lastPop = "";
    const update = () => {
      ticking = false;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(1, rect.height - vh);
      const traveled = Math.max(0, Math.min(total, -rect.top));
      const progress = traveled / total;
      const progressStep = Math.round(progress * 200) / 200;
      const pop = progress >= 0.75 ? "1" : "0";

      if (Math.abs(progressStep - lastProgress) >= 0.005) {
        section.style.setProperty("--cta-progress", String(progressStep));
        lastProgress = progressStep;
      }
      if (pop != lastPop) {
        section.style.setProperty("--cta-pop", pop);
        section.classList.toggle("is-cta-pop", pop === "1");
        lastPop = pop;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCtaScroll, { once: true });
  } else {
    setupCtaScroll();
  }
})();`}
        </Script>
      </body>
    </html>
  );
}
