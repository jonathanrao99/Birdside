import type { MetadataRoute } from "next";
import { statSync } from "fs";
import path from "path";
import { getLocationSlugs, getProductSlugs } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "/",
  "/about",
  "/menu",
  "/contact",
  "/locations",
  "/checkout",
  "/sauce-lab",
  "/catering",
  "/faq",
  "/privacy",
  "/terms",
  "/allergen"
] as const;

const STATIC_PRIORITIES: Partial<Record<(typeof STATIC_PATHS)[number], number>> = {
  "/": 1,
  "/menu": 0.9,
  "/locations": 0.9,
  "/catering": 0.8,
  "/faq": 0.8,
  "/sauce-lab": 0.8,
  "/privacy": 0.3,
  "/terms": 0.3,
  "/checkout": 0.2
};

function getLastModified() {
  const candidates = [
    path.join(process.cwd(), "content", "generated", "site-content.json"),
    path.join(process.cwd(), "content", "generated", "our-menu.json")
  ];

  const latest = candidates.reduce((latestTime, filePath) => {
    try {
      return Math.max(latestTime, statSync(filePath).mtimeMs);
    } catch {
      return latestTime;
    }
  }, 0);

  return latest > 0 ? new Date(latest) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = getLastModified();
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: STATIC_PRIORITIES[path] ?? 0.7
  }));

  for (const slug of getProductSlugs()) {
    entries.push({
      url: new URL(`/product/${slug}`, base).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6
    });
  }

  for (const slug of getLocationSlugs()) {
    entries.push({
      url: new URL(`/locations/${slug}`, base).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85
    });
  }

  return entries;
}
