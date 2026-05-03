import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let didRegister = false;

/**
 * Registers ScrollTrigger once in the browser. Safe to call from any client module.
 */
export function ensureScrollTriggerRegistered(): typeof ScrollTrigger {
  if (typeof window !== "undefined" && !didRegister) {
    gsap.registerPlugin(ScrollTrigger);
    didRegister = true;
  }
  return ScrollTrigger;
}
