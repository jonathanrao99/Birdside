"use client";

import { useLayoutEffect, useState } from "react";

/**
 * First-paint layer before hydration completes. Must unmount via React state — never `element.remove()`,
 * or reconciliation throws insertBefore NotFoundError.
 *
 * No `<img>` here: an image that vanishes on the first frame caused Chrome to warn about an unused
 * `link rel=preload` for that URL. Solid splash only; route `PageLoader` still shows the logo on navigations.
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

  return <div aria-hidden className="birdside-boot-splash" id="birdside-boot-splash" />;
}
