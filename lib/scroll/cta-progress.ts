import type Lenis from "lenis";

/**
 * CTA section scroll-linked `--cta-progress` / `--cta-pop` (matches legacy inline layout script).
 * GSAP ScrollTrigger is optional and intentionally not used here to avoid extra bundle weight.
 */
export function setupCtaProgress(lenis: Lenis | null): () => void {
  const section = document.querySelector(".section_cta") as HTMLElement | null;
  const wrapper = document.querySelector(
    ".section_cta .cta_wrapper"
  ) as HTMLElement | null;
  if (!section || !wrapper) {
    return () => {};
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    section.style.setProperty("--cta-progress", "1");
    section.style.setProperty("--cta-pop", "1");
    section.classList.add("is-cta-pop");
    return () => {};
  }

  let ticking = false;
  const apply = () => {
    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = Math.max(1, rect.height - vh);
    const traveled = Math.max(0, Math.min(total, -rect.top));
    const progress = traveled / total;
    const progressStep = Math.round(progress * 200) / 200;
    const pop = progress >= 0.75 ? "1" : "0";
    section.style.setProperty("--cta-progress", String(progressStep));
    section.style.setProperty("--cta-pop", pop);
    section.classList.toggle("is-cta-pop", pop === "1");
  };

  const onFrame = () => {
    ticking = false;
    apply();
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onFrame);
  };

  apply();

  const onLenisScroll = () => onScroll();
  const onBirdsideLenis = () => onScroll();
  const onVisibility = () => {
    if (!document.hidden) onScroll();
  };
  const onPageshow = (e: PageTransitionEvent) => {
    if (e.persisted) apply();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("scrollend", onScroll, { passive: true });
  window.addEventListener("birdside-lenis-scroll", onBirdsideLenis);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pageshow", onPageshow);

  if (lenis) {
    lenis.on("scroll", onLenisScroll);
  }

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("scrollend", onScroll);
    window.removeEventListener("birdside-lenis-scroll", onBirdsideLenis);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pageshow", onPageshow);
    if (lenis) {
      lenis.off("scroll", onLenisScroll);
    }
  };
}
