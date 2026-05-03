import type Lenis from "lenis";

/**
 * Home menu cover parallax via `--menu-parallax-y` (legacy script parity).
 * Subscribes to Lenis scroll when available so updates align with CTA / smooth scroll.
 */
export function setupHomeMenuParallax(lenis: Lenis | null): () => void {
  const section = document.querySelector(".section_home-menu");
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

  let ticking = false;
  let lastCover: string | null = null;

  const maxCoverPx = () =>
    window.matchMedia("(max-width: 767px)").matches ? 28 : 52;

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
    const next = `${px}px`;
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

  const onLenisScroll = () => onScroll();
  const onBirdsideLenis = () => onScroll();

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("birdside-lenis-scroll", onBirdsideLenis);

  if (lenis) {
    lenis.on("scroll", onLenisScroll);
  }

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("birdside-lenis-scroll", onBirdsideLenis);
    if (lenis) {
      lenis.off("scroll", onLenisScroll);
    }
  };
}
