import "./globals.css";
import "lenis/dist/lenis.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import BootSplash from "@/components/site/BootSplash";
import ElevenLabsConvai from "@/components/site/ElevenLabsConvai";
import PageTransitionChrome from "@/components/site/PageTransitionChrome";
import SmoothScroll from "@/components/site/SmoothScroll";
import { getSiteUrl } from "@/lib/site-url";

// Motion: PageLoader, mobile nav. Home hero: video. Marquee, CTA vars, page shell: globals.css. Scroll/tab DOM: ScrollEffectsClient in SmoothScroll.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Birdside HTX",
  description: "Wings, sandos, and late-night flavor — Birdside HTX in Katy, TX."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e30119"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- static shared stylesheet loaded once globally */}
        <link href="/vendor/brasa-template.shared.38e119549.min.css" rel="stylesheet" />
      </head>
      <body>
        <BootSplash />
        <PageTransitionChrome>
          <SmoothScroll>{children}</SmoothScroll>
        </PageTransitionChrome>
        <ElevenLabsConvai />
      </body>
    </html>
  );
}
