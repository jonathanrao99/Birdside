"use client";

import {
  NavbarLogoLink,
  NavbarMainLink
} from "@/components/site/shell-interactive";
import PatternStrip from "@/components/site/PatternStrip";
import PeckersStyleActionButton from "@/components/site/PeckersStyleActionButton";
import { navInfoBlocks, navLogo, navMainLinks } from "@/lib/site-shell-data";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE_NAV = [0.33, 1, 0.32, 1] as const;
const EASE_BURGER = [0.22, 1, 0.36, 1] as const;

export default function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavLayout, setMobileNavLayout] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 991px)");
    const apply = () => setMobileNavLayout(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      if (!cancelled) setMenuOpen(false);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const instant = reducedMotion ? { duration: 0 } : false;
  const mobile = mobileNavLayout;

  return (
    <div className="navbars">
      <nav aria-label="Main navigation" className="navbar">
        <div className="padding-global">
          <div className="container-medium">
            <div className="navbar_component">
              <div className="navbar_main">
                <NavbarLogoLink alt={navLogo.alt} href="/" src={navLogo.src} />
                <motion.div
                  id="navbar-main-links"
                  className="navbar_links"
                  inert={mobile && !menuOpen ? true : undefined}
                  style={
                    mobile ? { pointerEvents: menuOpen ? "auto" : "none" } : undefined
                  }
                  initial={false}
                  animate={
                    mobile
                      ? {
                          opacity: menuOpen ? 1 : 0,
                          y: menuOpen ? "0rem" : "-0.6rem"
                        }
                      : { opacity: 1, y: "0rem" }
                  }
                  transition={
                    instant
                      ? instant
                      : {
                          opacity: {
                            duration: 0.42,
                            ease: EASE_NAV
                          },
                          y: { duration: 0.45, ease: EASE_NAV }
                        }
                  }
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) {
                      setMenuOpen(false);
                    }
                  }}
                >
                  {navMainLinks.map((item, i) =>
                    mobile ? (
                      <motion.div
                        key={item.href}
                        className="navbar_link-motion-wrap"
                        initial={false}
                        animate={{
                          opacity: menuOpen ? 1 : 0,
                          y: menuOpen ? "0rem" : "0.65rem"
                        }}
                        transition={
                          instant
                            ? instant
                            : {
                                opacity: {
                                  duration: 0.42,
                                  ease: EASE_NAV,
                                  delay: menuOpen ? 0.05 * (i + 1) : 0
                                },
                                y: {
                                  duration: 0.45,
                                  ease: EASE_NAV,
                                  delay: menuOpen ? 0.05 * (i + 1) : 0
                                }
                              }
                        }
                      >
                        <NavbarMainLink {...item} />
                      </motion.div>
                    ) : (
                      <NavbarMainLink key={item.href} {...item} />
                    )
                  )}
                </motion.div>
              </div>
              <div className="navbar_infos">
                {navInfoBlocks.map((block) => (
                  <PeckersStyleActionButton
                    key={block.href}
                    className="navbar_peckers-cta"
                    href={block.href}
                    variant={block.variant}
                  >
                    {block.label}
                  </PeckersStyleActionButton>
                ))}
              </div>
              <button
                type="button"
                className="navbar_hamburger-wrap"
                data-w-id="9a3b798c-daff-c12d-dbef-1aaa741e672e"
                aria-expanded={menuOpen}
                aria-controls="navbar-main-links"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <div className="navbar_hamburger" aria-hidden>
                  <motion.div
                    className="navbar_hamburger-line _1"
                    initial={false}
                    animate={
                      mobile && menuOpen
                        ? { y: 4, rotate: 45 }
                        : { y: 0, rotate: 0 }
                    }
                    transition={
                      instant
                        ? instant
                        : { duration: 0.32, ease: EASE_BURGER }
                    }
                  />
                  <motion.div
                    className="navbar_hamburger-line _2"
                    initial={false}
                    animate={
                      mobile && menuOpen
                        ? { y: -4, rotate: -45 }
                        : { y: 0, rotate: 0 }
                    }
                    transition={
                      instant
                        ? instant
                        : { duration: 0.32, ease: EASE_BURGER }
                    }
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <PatternStrip tone="black" />
    </div>
  );
}
