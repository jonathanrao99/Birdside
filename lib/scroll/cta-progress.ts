import gsap from "gsap";
import type Lenis from "lenis";
import { ensureScrollTriggerRegistered } from "@/lib/gsap/register-scroll-trigger";

const IMAGE_GROW_END = 0.92;
const LOCATION_REVEAL_START = 0.94;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function snapProgress(value: number) {
  return Math.round(value * 200) / 200;
}

/**
 * CTA section scroll-linked `--cta-progress` / `--cta-pop` (legacy script parity).
 * ScrollTrigger plus direct scroll listeners keep the legacy HTML section in sync.
 */
export function setupCtaProgress(lenis: Lenis | null): () => void {
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

  let frame = 0;

  const apply = () => {
    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = Math.max(1, rect.height - vh);
    const traveled = Math.max(0, Math.min(total, -rect.top));
    const sectionProgress = traveled / total;
    const progressStep = snapProgress(clamp01(sectionProgress / IMAGE_GROW_END));
    const pop = sectionProgress >= LOCATION_REVEAL_START ? "1" : "0";
    section.style.setProperty("--cta-progress", String(progressStep));
    section.style.setProperty("--cta-pop", pop);
    section.classList.toggle("is-cta-pop", pop === "1");
  };

  const scheduleApply = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      apply();
    });
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      invalidateOnRefresh: true,
      onRefresh: apply,
      onUpdate: apply
    });
  }, section);

  apply();

  const onVisibility = () => {
    if (!document.hidden) {
      ScrollTrigger.update();
      scheduleApply();
    }
  };
  const onPageshow = (e: PageTransitionEvent) => {
    if (e.persisted) {
      ScrollTrigger.update();
      scheduleApply();
    }
  };
  const onResize = () => {
    ScrollTrigger.refresh();
    scheduleApply();
  };

  window.addEventListener("scroll", scheduleApply, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pageshow", onPageshow);
  document.addEventListener("visibilitychange", onVisibility);
  lenis?.on("scroll", scheduleApply);

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    lenis?.off("scroll", scheduleApply);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pageshow", onPageshow);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", scheduleApply);
    ctx.revert();
  };
}
