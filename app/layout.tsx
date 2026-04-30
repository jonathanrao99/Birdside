import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { getSiteUrl } from "@/lib/site-url";

const WEBFLOW_ORIGIN = "https://cdn.prod.website-files.com";
const JQUERY_ORIGIN = "https://d3e54v103j8qbb.cloudfront.net";
const WEBFLOW_JS_BASE = `${WEBFLOW_ORIGIN}/67d43c25fbcd1b83dd9ac238/js`;

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
        <link rel="preconnect" href={WEBFLOW_ORIGIN} crossOrigin="anonymous" />
        <link rel="preconnect" href={JQUERY_ORIGIN} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={WEBFLOW_ORIGIN} />
        <link rel="dns-prefetch" href={JQUERY_ORIGIN} />
        {/* eslint-disable-next-line @next/next/no-css-tags -- self-hosted Webflow bundle; not a JS import */}
        <link href="/vendor/brasa-template.shared.38e119549.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script
          src={`${JQUERY_ORIGIN}/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67d43c25fbcd1b83dd9ac238`}
          strategy="afterInteractive"
        />
        <Script
          src={`${WEBFLOW_JS_BASE}/brasa-template.schunk.17808c0d08c97489.js`}
          strategy="afterInteractive"
        />
        <Script
          src={`${WEBFLOW_JS_BASE}/brasa-template.schunk.72f02ff067507ae2.js`}
          strategy="afterInteractive"
        />
        <Script
          src={`${WEBFLOW_JS_BASE}/brasa-template.ac0db634.ca84a4271f3b6a38.js`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
