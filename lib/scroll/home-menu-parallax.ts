import gsap from "gsap";
import type Lenis from "lenis";
import { ensureScrollTriggerRegistered } from "@/lib/gsap/register-scroll-trigger";

/**
 * Home menu cover parallax via `--menu-parallax-y` (legacy script parity).
 * ScrollTrigger + Lenis drive updates (see SmoothScroll).
 */
export function setupHomeMenuParallax(_lenis: Lenis | null): () => void {
  const ScrollTrigger = ensureScrollTriggerRegistered();
  const section = document.querySelector(".section_home-menu") as HTMLElement | null;
  const wrap = section?.querySelector(
    ".home-menu_cover-wrap"
  ) as HTMLElement | null;
  if (!section || !wrap) {
    return () => {};
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    wrap.style.setProperty("--menu-parallax-y", "0px");
    return () => {};
  }

  let lastCover: string | null = null;

  const maxCoverPx = () =>
    window.matchMedia("(max-width: 767px)").matches ? 28 : 52;

  const update = () => {
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
    const next = `${px}px`;
    if (next !== lastCover) {
      wrap.style.setProperty("--menu-parallax-y", next);
      lastCover = next;
    }
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      invalidateOnRefresh: true,
      onUpdate: update
    });
  }, section);

  update();

  return () => {
    ctx.revert();
  };
}
