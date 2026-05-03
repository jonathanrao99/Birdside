"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/site/PageLoader";

type Props = { children: ReactNode };

/**
 * Loader runs on first visit and on every client navigation, with path synced during render
 * so the next route doesn’t paint before the overlay.
 *
 * Layering: full-screen fade is `PageLoader` (motion/react). The content shell below uses
 * CSS (`.birdside-page-transition-shell` in app/globals.css) only — no second motion fade.
 */
export default function PageTransitionChrome({ children }: Props) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isPageLoading, setIsPageLoading] = useState(true);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsPageLoading(true);
  }

  useEffect(() => {
    if (isPageLoading) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    document.body.style.overflow = "";
    return;
  }, [isPageLoading]);

  const handleLoaderComplete = useCallback(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      <PageLoader
        key={pathname}
        loading={isPageLoading}
        onComplete={handleLoaderComplete}
      />
      <div
        className={`birdside-page-transition-shell ${isPageLoading ? "birdside-page-transition-shell--loading" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
