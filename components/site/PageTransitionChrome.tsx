"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore
} from "react";
import { usePathname } from "next/navigation";
import HomePreloader from "@/components/site/HomePreloader";
import PageLoader from "@/components/site/PageLoader";
import { HOME_PRELOADER_SESSION_KEY } from "@/lib/home-preloader-letters";

type Props = { children: ReactNode };

function subscribe() {
  return () => {};
}

function homeIntroAlreadyShown(): boolean {
  try {
    return sessionStorage.getItem(HOME_PRELOADER_SESSION_KEY) === "true";
  } catch {
    return true;
  }
}

/**
 * Loader runs on first visit and on every client navigation, with path synced during render
 * so the next route does not paint before the overlay.
 *
 * On `/` the image route loader is never used (`pageLoaderLoading` is always false there);
 * the letter `HomePreloader` handles first-session intro. Scroll stays locked while that
 * intro is active or while a non-home route is loading.
 */
export default function PageTransitionChrome({ children }: Props) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [homeIntroDone, setHomeIntroDone] = useState(false);

  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  const homeLetterIntroActive =
    hydrated && pathname === "/" && !homeIntroAlreadyShown();

  const pageLoaderLoading = pathname !== "/" && isPageLoading;

  const bodyScrollLocked =
    (homeLetterIntroActive && !homeIntroDone) || pageLoaderLoading;

  const shellLocked = pageLoaderLoading;

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsPageLoading(true);
  }

  useEffect(() => {
    if (bodyScrollLocked) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    document.body.style.overflow = "";
    return;
  }, [bodyScrollLocked]);

  const handleLoaderComplete = useCallback(() => {
    setIsPageLoading(false);
  }, []);

  const handleHomeIntroComplete = useCallback(() => {
    setHomeIntroDone(true);
    setIsPageLoading(false);
  }, []);

  return (
    <>
      <PageLoader
        key={pathname}
        loading={pageLoaderLoading}
        onComplete={handleLoaderComplete}
      />
      <HomePreloader onComplete={handleHomeIntroComplete} />
      <div
        className={`birdside-page-transition-shell ${shellLocked ? "birdside-page-transition-shell--loading" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
