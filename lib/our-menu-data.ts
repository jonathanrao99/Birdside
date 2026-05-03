import { readFileSync } from "fs";
import path from "path";
import type { OurMenuData } from "@/lib/our-menu-types";

let cached: OurMenuData | null | undefined;

function loadFresh(): OurMenuData | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "generated",
      "our-menu.json"
    );
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as OurMenuData;
  } catch {
    return null;
  }
}

/**
 * Loads `content/generated/our-menu.json` (from `scripts/extract-our-menu.mjs`).
 * Returns `null` if missing (caller may fall back to legacy HTML).
 */
export function getOurMenuData(): OurMenuData | null {
  if (process.env.NODE_ENV === "development") {
    return loadFresh();
  }
  if (cached !== undefined) return cached;
  cached = loadFresh();
  return cached;
}
