"use client";

import { useEffect } from "react";

export default function ViewportScript() {
  useEffect(() => {
    const root = document.documentElement;
    let width = window.innerWidth;

    function setViewport() {
      const h = window.innerHeight || document.documentElement.clientHeight || 0;
      if (!h) return;
      root.style.setProperty("--birdside-vh", h * 0.01 + "px");
      root.style.setProperty("--birdside-viewport-h", h + "px");
    }

    setViewport();

    function onResize() {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      setViewport();
    }

    function onOrientationChange() {
      window.setTimeout(() => {
        width = window.innerWidth;
        setViewport();
      }, 250);
    }

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrientationChange, {
      passive: true
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, []);

  return null;
}
