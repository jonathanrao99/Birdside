import gsap from "gsap";
import type Lenis from "lenis";
import { ensureScrollTriggerRegistered } from "@/lib/gsap/register-scroll-trigger";

/**
 * CTA section scroll-linked `--cta-progress` / `--cta-pop` (legacy script parity).
 * ScrollTrigger + Lenis (`ScrollTrigger.update` on Lenis scroll in SmoothScroll) drive updates.
 */
export function setupCtaProgress(_lenis: Lenis | null): () => void {
  const ScrollTrigger = ensureScrollTriggerRegistered();
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

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      invalidateOnRefresh: true,
      onUpdate: apply
    });
  }, section);

  apply();

  const onVisibility = () => {
    if (!document.hidden) {
      ScrollTrigger.update();
    }
  };
  const onPageshow = (e: PageTransitionEvent) => {
    if (e.persisted) {
      ScrollTrigger.update();
      apply();
    }
  };
  window.addEventListener("pageshow", onPageshow);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pageshow", onPageshow);
    ctx.revert();
  };
}
