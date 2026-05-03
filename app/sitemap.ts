import type { MetadataRoute } from "next";
import { getLocationSlugs, getProductSlugs } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "/",
  "/about",
  "/menu",
  "/contact",
  "/locations",
  "/checkout"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7
  }));

  for (const slug of getProductSlugs()) {
    entries.push({
      url: new URL(`/product/${slug}`, base).toString(),
      changeFrequency: "weekly",
      priority: 0.6
    });
  }

  for (const slug of getLocationSlugs()) {
    entries.push({
      url: new URL(`/locations/${slug}`, base).toString(),
      changeFrequency: "monthly",
      priority: 0.6
    });
  }

  return entries;
}
