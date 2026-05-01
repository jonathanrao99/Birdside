import type { Metadata } from "next";
import type { LegacyPageEntry } from "@/lib/site-content";
import { getRouteContent } from "@/lib/site-content";

export const SITE_NAME = "Birdside HTX";

const GENERIC_BRASA = /^Brasa\s*-\s*Webflow/i;
const GENERIC_WEBFLOW_ECOM = /Webflow Ecommerce website template/i;

const ROUTE_LABELS: Record<string, string> = {
  "/": SITE_NAME,
  "/about": "About",
  "/menu": "Menu",
  "/contact": "Contact",
  "/locations": "Locations",
  "/checkout": "Checkout"
};

/** Prefer real titles; replace Webflow template noise with Birdside naming. */
export function displayTitle(path: string, entryTitle: string): string {
  const t = entryTitle.trim();
  if (GENERIC_BRASA.test(t) || GENERIC_WEBFLOW_ECOM.test(t)) {
    if (path === "/") return SITE_NAME;
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
  const description = entry.description?.trim() || `${SITE_NAME} — wings, sandos, and more in Katy, TX.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function createStaticRouteMetadata(route: string): () => Metadata {
  return function generateMetadata(): Metadata {
    const entry = getRouteContent(route);
    if (!entry) return {};
    return buildPageMetadata(route, entry);
  };
}
