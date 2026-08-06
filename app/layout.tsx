import "./globals.css";
import "lenis/dist/lenis.css";
import { Space_Grotesk } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import BootSplash from "@/components/site/BootSplash";
import ElevenLabsConvai from "@/components/site/ElevenLabsConvai";
import JsonLd from "@/components/site/JsonLd";
import PageTransitionChrome from "@/components/site/PageTransitionChrome";
import SmoothScroll from "@/components/site/SmoothScroll";
import ViewportScript from "@/components/site/ViewportScript";
import { buildRestaurantJsonLd, buildWebsiteJsonLd, LOCAL_BUSINESS } from "@/lib/local-seo";
import { getSiteUrl } from "@/lib/site-url";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap"
});

// Motion: PageLoader, mobile nav. Home hero: video. Marquee, CTA vars, page shell: globals.css. Scroll/tab DOM: ScrollEffectsClient in SmoothScroll.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: LOCAL_BUSINESS.name,
  title: {
    default: "Birdside HTX | Houston Hot Chicken in Katy, TX",
    template: "%s | Birdside HTX"
  },
  description: LOCAL_BUSINESS.description,
  keywords: [
    "Birdside HTX",
    "Houston hot chicken",
    "Katy TX chicken",
    "Katy wings",
    "Nashville hot chicken Katy",
    "late night food Katy TX",
    "chicken sandos Houston",
    "wings Katy Texas"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Birdside HTX | Houston Hot Chicken in Katy, TX",
    description: LOCAL_BUSINESS.description,
    url: "/",
    siteName: LOCAL_BUSINESS.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: LOCAL_BUSINESS.ogImagePath,
        width: 1200,
        height: 630,
        alt: "Birdside HTX hot chicken, wings, and sandos"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Birdside HTX | Houston Hot Chicken in Katy, TX",
    description: LOCAL_BUSINESS.description,
    images: [LOCAL_BUSINESS.ogImagePath]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Katy",
    "geo.position": `${LOCAL_BUSINESS.latitude};${LOCAL_BUSINESS.longitude}`,
    ICBM: `${LOCAL_BUSINESS.latitude}, ${LOCAL_BUSINESS.longitude}`,
    "business:contact_data:street_address": LOCAL_BUSINESS.streetAddress,
    "business:contact_data:locality": LOCAL_BUSINESS.addressLocality,
    "business:contact_data:region": LOCAL_BUSINESS.addressRegion,
    "business:contact_data:postal_code": LOCAL_BUSINESS.postalCode,
    "business:contact_data:country_name": LOCAL_BUSINESS.addressCountry,
    "business:contact_data:phone_number": LOCAL_BUSINESS.displayPhone
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e30119"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- static shared stylesheet loaded once globally */}
        <link href="/vendor/brasa-template.shared.38e119549.min.css" rel="stylesheet" />
      </head>
      <body>
        <ViewportScript />
        <BootSplash />
        <PageTransitionChrome>
          <SmoothScroll>{children}</SmoothScroll>
        </PageTransitionChrome>
        <JsonLd data={[buildRestaurantJsonLd(), buildWebsiteJsonLd()]} />
        <ElevenLabsConvai />
      </body>
    </html>
  );
}
