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
  const SEL_HOME = ".section_home-menu";

  const decorateHomeMenuTabs = (tabsRoot) => {
    if (tabsRoot.dataset.menuTabsDecorated === "1") return;
    tabsRoot.dataset.menuTabsDecorated = "1";
    const menu = tabsRoot.querySelector(".w-tab-menu");
    const links = menu ? [...menu.querySelectorAll("a.w-tab-link")] : [];
    if (menu && !menu.hasAttribute("role")) menu.setAttribute("role", "tablist");
    links.forEach((a, idx) => {
      const key = a.getAttribute("data-w-tab");
      if (!key) return;
      if (!a.id) a.id = "hm-tab-" + idx;
      a.setAttribute("role", "tab");
      const pane = [...tabsRoot.querySelectorAll(".w-tab-content > .w-tab-pane")].find(
        (p) => p.getAttribute("data-w-tab") === key
      );
      if (pane) {
        if (!pane.id) pane.id = "hm-panel-" + idx;
        pane.setAttribute("role", "tabpanel");
        a.setAttribute("aria-controls", pane.id);
        pane.setAttribute("aria-labelledby", a.id);
      }
    });
  };

  const activateHomeMenuTab = (tabsRoot, tabId) => {
    const links = tabsRoot.querySelectorAll(".w-tab-menu a.w-tab-link");
    const panes = tabsRoot.querySelectorAll(".w-tab-content > .w-tab-pane");
    tabsRoot.setAttribute("data-current", tabId);
    links.forEach((a) => {
      const on = a.getAttribute("data-w-tab") === tabId;
      a.classList.toggle("w--current", on);
      a.setAttribute("aria-selected", on ? "true" : "false");
      a.tabIndex = on ? 0 : -1;
    });
    panes.forEach((pane) => {
      const on = pane.getAttribute("data-w-tab") === tabId;
      pane.classList.toggle("w--tab-active", on);
      pane.setAttribute("aria-hidden", on ? "false" : "true");
    });
  };

  const onClick = (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    const section = t.closest(SEL_HOME);
    if (!section) return;
    const link = t.closest(".w-tab-menu a.w-tab-link");
    if (!link || !section.contains(link)) return;
    const tabsRoot = link.closest(".w-tabs");
    if (!tabsRoot) return;
    const tabId = link.getAttribute("data-w-tab");
    if (!tabId || link.classList.contains("w--current")) return;
    e.preventDefault();
    decorateHomeMenuTabs(tabsRoot);
    activateHomeMenuTab(tabsRoot, tabId);
  };

  const onKeydown = (e) => {
    const k = e.key;
    if (k !== "ArrowLeft" && k !== "ArrowRight" && k !== "Home" && k !== "End") return;
    const t = e.target;
    if (!t || !t.closest || !t.matches || !t.matches("a.w-tab-link")) return;
    const menu = t.closest(SEL_HOME + " .w-tab-menu");
    if (!menu || !menu.contains(t)) return;
    const tabsRoot = menu.closest(".w-tabs");
    if (!tabsRoot) return;
    const links = [...menu.querySelectorAll("a.w-tab-link")];
    const i = links.indexOf(t);
    if (i < 0) return;
    e.preventDefault();
    decorateHomeMenuTabs(tabsRoot);
    let next = i;
    if (k === "ArrowRight") next = (i + 1) % links.length;
    else if (k === "ArrowLeft") next = (i - 1 + links.length) % links.length;
    else if (k === "Home") next = 0;
    else if (k === "End") next = links.length - 1;
    const tabId = links[next].getAttribute("data-w-tab");
    if (!tabId) return;
    activateHomeMenuTab(tabsRoot, tabId);
    links[next].focus();
  };

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeydown);

  const boot = () => {
    document.querySelectorAll(SEL_HOME + " .w-tabs").forEach((tabsRoot) => {
      decorateHomeMenuTabs(tabsRoot);
      const links = [...tabsRoot.querySelectorAll(".w-tab-menu a.w-tab-link")];
      const cur =
        tabsRoot.getAttribute("data-current") ||
        links.find((a) => a.classList.contains("w--current"))?.getAttribute("data-w-tab") ||
        links[0]?.getAttribute("data-w-tab");
      if (cur) activateHomeMenuTab(tabsRoot, cur);
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();`}
        </Script>
        <Script id="home-menu-product-img-nav" strategy="afterInteractive">
          {`(() => {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    const img = e.target.closest(".section_home-menu img.menu_img");
    if (!img) return;
    const row = img.closest(".menu_block-content");
    if (!row) return;
    const a = row.querySelector(
      'a.button-icon_component[href], a[href^="/product/"]'
    );
    const href = a && a.getAttribute("href");
    if (!href) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    a.click();
  });
})();`}
        </Script>
      </body>
    </html>
  );
}
