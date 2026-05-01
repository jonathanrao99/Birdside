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
        <Script id="home-menu-parallax" strategy="afterInteractive">
          {`(() => {
  const setupHomeMenuParallax = () => {
    const section = document.querySelector(".section_home-menu");
    if (!section) return;
    const wrap = section.querySelector(".home-menu_cover-wrap");
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      wrap.style.setProperty("--menu-parallax-y", "0px");
      return;
    }

    let ticking = false;
    let lastCover = null;

    const maxCoverPx = () => (window.matchMedia("(max-width: 767px)").matches ? 28 : 52);

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const hidden = rect.bottom < 0 || rect.top > vh;

      if (hidden) {
        if (lastCover !== "0px") {
          wrap.style.setProperty("--menu-parallax-y", "0px");
          lastCover = "0px";
        }
        return;
      }

      const speed = 0.14;
      const raw = -rect.top * speed;

      const m = maxCoverPx();
      const px = Math.max(-m, Math.min(m, Math.round(raw * 10) / 10));
      const next = px + "px";
      if (next !== lastCover) {
        wrap.style.setProperty("--menu-parallax-y", next);
        lastCover = next;
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
    document.addEventListener("DOMContentLoaded", setupHomeMenuParallax, { once: true });
  } else {
    setupHomeMenuParallax();
  }
})();`}
        </Script>
        <Script id="home-menu-tabs" strategy="afterInteractive">
          {`(() => {
  const activateHomeMenuTab = (tabsRoot, tabId) => {
    tabsRoot.setAttribute("data-current", tabId);
    tabsRoot.querySelectorAll(".w-tab-menu .w-tab-link").forEach((a) => {
      a.classList.toggle("w--current", a.getAttribute("data-w-tab") === tabId);
    });
    tabsRoot.querySelectorAll(".w-tab-content > .w-tab-pane").forEach((pane) => {
      pane.classList.toggle("w--tab-active", pane.getAttribute("data-w-tab") === tabId);
    });
  };

  const onClick = (e) => {
    const link = e.target.closest(".section_home-menu .w-tab-menu a.w-tab-link");
    if (!link) return;
    const tabsRoot = link.closest(".w-tabs");
    if (!tabsRoot || !tabsRoot.closest(".section_home-menu")) return;
    const tabId = link.getAttribute("data-w-tab");
    if (!tabId) return;
    e.preventDefault();
    activateHomeMenuTab(tabsRoot, tabId);
  };

  document.addEventListener("click", onClick);
})();`}
        </Script>
      </body>
    </html>
  );
}
