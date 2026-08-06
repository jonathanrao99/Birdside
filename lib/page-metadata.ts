import type { Metadata } from "next";
import { LOCAL_BUSINESS } from "@/lib/local-seo";
import type { LegacyPageEntry } from "@/lib/site-content";
import { getRouteContent } from "@/lib/site-content";

export const SITE_NAME = "Birdside HTX";

const GENERIC_BRASA = /^Brasa\s*-\s*Webflow/i;
const GENERIC_WEBFLOW_ECOM = /Webflow Ecommerce website template/i;
const GENERIC_TEMPLATE_DESCRIPTION =
  /Attract more customers and boost sales with this bold, modern fast food template/i;

const ROUTE_LABELS: Record<string, string> = {
  "/": SITE_NAME,
  "/about": "Our Story",
  "/menu": "Menu",
  "/contact": "Contact",
  "/locations": "Find Us",
  "/checkout": "Checkout",
  "/sauce-lab": "Sauce Lab",
  "/catering": "Catering",
  "/faq": "FAQ",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/allergen": "Allergen Info"
};

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  "/": "Wings, sandos, and late-night flavor from Birdside HTX in Katy, TX.",
  "/about": "Meet Birdside HTX, Katy's late-night chicken spot for wings, sandos, sauces, and big Houston flavor.",
  "/menu": "Explore Birdside HTX sandos, wings, sides, drinks, and sauces made for serious chicken cravings.",
  "/contact": "Contact Birdside HTX for questions, catering, and late-night chicken in Katy, TX.",
  "/locations": "Find Birdside HTX in Katy, TX, get directions, and check how to pull up for wings and sandos.",
  "/checkout": "Finish your Birdside HTX order for wings, sandos, sides, and sauces.",
  "/sauce-lab": "Explore Birdside HTX house sauces, dips, and flavor experiments in the Sauce Lab.",
  "/catering": "Bring Birdside HTX wings, sandos, and sides to your next event with catering in Katy and Houston.",
  "/faq": "Answers to common Birdside HTX questions about ordering, food, catering, and visiting us.",
  "/privacy": "Birdside HTX privacy policy and information about how site data is handled.",
  "/terms": "Birdside HTX terms of service for using the website and online ordering links.",
  "/allergen": "Birdside HTX allergen information for guests with food allergies or dietary concerns."
};

const DEFAULT_OG_IMAGE = {
  url: LOCAL_BUSINESS.ogImagePath,
  width: 1200,
  height: 630,
  alt: "Birdside HTX hot chicken, wings, sandos, and late-night flavor"
};

const LOCAL_GEO_META = {
  "geo.region": "US-TX",
  "geo.placename": LOCAL_BUSINESS.addressLocality,
  "geo.position": `${LOCAL_BUSINESS.latitude};${LOCAL_BUSINESS.longitude}`,
  ICBM: `${LOCAL_BUSINESS.latitude}, ${LOCAL_BUSINESS.longitude}`
};

/** Prefer real titles; replace Webflow template noise with Birdside naming. */
export function displayTitle(path: string, entryTitle: string): string {
  const t = entryTitle.trim();
  if (GENERIC_BRASA.test(t) || GENERIC_WEBFLOW_ECOM.test(t)) {
    if (path === "/") return "Houston Hot Chicken in Katy, TX | Birdside HTX";
    const label = ROUTE_LABELS[path];
    return label ? `${label} | ${SITE_NAME}` : SITE_NAME;
  }
  const cleaned = t.replace(/\s*\|\s*Brasa[^\|]*$/i, "").trim();
  if (cleaned && cleaned !== t) return `${cleaned} | ${SITE_NAME}`;
  return t;
}

export function buildPageMetadata(
  path: string,
  entry: LegacyPageEntry
): Metadata {
  const title = displayTitle(path, entry.title);
  const entryDescription = entry.description?.trim() || "";
  const description = GENERIC_TEMPLATE_DESCRIPTION.test(entryDescription)
    ? ROUTE_DESCRIPTIONS[path] ?? `${SITE_NAME} — wings, sandos, and more in Katy, TX.`
    : entryDescription ||
      ROUTE_DESCRIPTIONS[path] ||
      `${SITE_NAME} — wings, sandos, and more in Katy, TX.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [LOCAL_BUSINESS.ogImagePath]
    },
    other: LOCAL_GEO_META
  };
}

export function createStaticRouteMetadata(route: string): () => Metadata {
  return function generateMetadata(): Metadata {
    const entry = getRouteContent(route);
    if (!entry) return {};
    return buildPageMetadata(route, entry);
  };
}

/** Static legal / info pages that are not backed by CMS JSON. */
export function buildPlaceholderMetadata(
  route: string,
  description: string
): Metadata {
  const label = ROUTE_LABELS[route] ?? route;
  const title = `${label} | ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: route
    },
    openGraph: {
      title,
      description,
      url: route,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [LOCAL_BUSINESS.ogImagePath]
    },
    other: LOCAL_GEO_META
  };
}
