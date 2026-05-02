"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Only show preloader on the homepage ("/")
export default function Preloader({ onComplete = () => { } }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const pathname = usePathname();

  // Only allow preloader to show if we're on the home page ("/" or "/home")
  const isHomePage =
    pathname === "/" ||
    pathname === "/home" ||
    pathname === "/home/";

  const [shouldRender, setShouldRender] = useState(isHomePage);

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      const hasShown = typeof sessionStorage !== 'undefined' && sessionStorage.getItem("preloaderShown");

      if (!isHomePage || hasShown) {
        // If not homepage, or already shown this session, skip entirely
        setShouldRender(false);
        onComplete();
        return;
      }
    }
  }, [isHomePage, onComplete]);

  useEffect(() => {
    // Double check if we should actually be animating
    // This prevents a race condition where opacity is set to 0 but never animated back to 1 because shouldRender becomes false
    const hasShown = typeof sessionStorage !== 'undefined' && sessionStorage.getItem("preloaderShown");
    if (!shouldRender || !isHomePage || hasShown) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // Mark preloader as shown for this session
        sessionStorage.setItem("preloaderShown", "true");
        onComplete();
      }
    });

    const main = document.querySelector("#main-content");
    const navbar = document.querySelector("#main-navbar");
    if (main || navbar) {
      const targets = [main, navbar].filter(Boolean);
      // Set initial state for zoom out
      gsap.set(targets, {
        scale: 2.3,
        y: -100,
        opacity: 0,
        transformOrigin: "50% 60vh",
      });
    }

    // Set initial text styles BEFORE displaying to avoid flash
    gsap.set(textRef.current, {
      letterSpacing: "0.4em",
      opacity: 1
    });

    tl.to(
      textRef.current,
      {
        letterSpacing: "0.02em",
        duration: 1,
      }
    );

    tl.to(textRef.current, {
      scale: 1.06,
      duration: 1,
      ease: "power2.inOut",
    });

    // Slide preloader down
    tl.to(containerRef.current, {
      yPercent: 100,
      duration: 1.3,
      ease: "power4.inOut",
    });

    // Animate main content zoom and opacity in parallel with preloader sliding out
    if (main || navbar) {
      const targets = [main, navbar].filter(Boolean);
      tl.to(
        targets,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      );
    }

    return () => {
      tl.kill();
    };
  }, [shouldRender, isHomePage, onComplete]);

  const word = "PECKERS";

  if (!shouldRender || !isHomePage) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10000 flex items-center justify-center bg-white"
    >
      <h1
        ref={textRef}
        className="flex font-peakers font-black text-black text-[16vw] md:text-[clamp(3.5rem,11vw,16rem)] opacity-0"
        style={{
          letterSpacing: "0.4em",
          lineHeight: 1,
        }}
      >
        {word.split("").map((letter, i) => (
          <span key={i}>
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}

