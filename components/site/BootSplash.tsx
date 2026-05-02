"use client";

import { useLayoutEffect, useState } from "react";
import { PAGE_LOADER_LOGO_SRC } from "@/lib/page-loader-constants";

/**
 * First-paint layer before hydration completes. Must unmount via React state — never `element.remove()`,
 * or reconciliation throws insertBefore NotFoundError.
 */
export default function BootSplash() {
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      setVisible(false);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden className="birdside-boot-splash" id="birdside-boot-splash">
      {/* eslint-disable-next-line @next/next/no-img-element -- static public asset */}
      <img alt="" className="birdside-boot-splash__img" src={PAGE_LOADER_LOGO_SRC} />
    </div>
  );
}
