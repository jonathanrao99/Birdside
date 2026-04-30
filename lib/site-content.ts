import { readFileSync } from "fs";
import path from "path";

export type LegacyPageEntry = {
  route: string;
  title: string;
  description: string;
  mainHtml: string;
};

type SiteContent = {
  global: {
    siteName: string;
    navbarHtml: string;
    footerHtml: string;
  };
  routes: Record<string, LegacyPageEntry>;
  products: Record<string, LegacyPageEntry>;
  posts: Record<string, LegacyPageEntry>;
  locations: Record<string, LegacyPageEntry>;
};

let cached: SiteContent | null = null;

function loadSiteContent(): SiteContent {
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "content", "generated", "site-content.json");
  const raw = readFileSync(filePath, "utf-8");
  cached = JSON.parse(raw) as SiteContent;
  return cached;
}

export function getSiteGlobal() {
  return loadSiteContent().global;
}

export function getRouteContent(route: string): LegacyPageEntry | null {
  return loadSiteContent().routes[route] ?? null;
}

export function getProductContent(slug: string): LegacyPageEntry | null {
  return loadSiteContent().products[slug] ?? null;
}

export function getPostContent(slug: string): LegacyPageEntry | null {
  return loadSiteContent().posts[slug] ?? null;
}

export function getLocationContent(slug: string): LegacyPageEntry | null {
  return loadSiteContent().locations[slug] ?? null;
}

export function getProductSlugs(): string[] {
  return Object.keys(loadSiteContent().products);
}

export function getPostSlugs(): string[] {
  return Object.keys(loadSiteContent().posts);
}

export function getLocationSlugs(): string[] {
  return Object.keys(loadSiteContent().locations);
}
