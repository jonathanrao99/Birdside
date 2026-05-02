/**
 * SEO Utility for Peckers
 *
 * Supports static AND dynamic metadata. Dynamic metadata reads a search
 * keyword from common query-string keys (q, query, s, search, keyword, kw)
 * and injects it into the title, description and keyword list so the
 * same page surfaces with relevance to the visitor's search intent.
 */

export const SEO_CONFIG = {
  siteName: "Peckers",
  titleSuffix: " | Peckers - Seriously Good Chicken",
  defaultDescription:
    "Premium grilled and fried chicken in Hertfordshire. Peckers serves fresh peri-peri chicken, gourmet burgers, crispy wings, and signature sides in Stevenage and Hitchin.",
  baseUrl: "https://www.peckerschicken.co.uk",
  defaultImage: "/Peckers Logo 1 [Vectorized].svg",
  twitterHandle: "@peckerschicken",
};

const SEARCH_KEYS = ["q", "query", "s", "search", "keyword", "kw", "term"];
const MAX_KEYWORD_LENGTH = 60;
const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 160;

const CONTROL_CHAR_REGEX = /[\x00-\x1F\x7F]/g;

/**
 * Strip control chars / HTML and trim a raw search keyword to a safe form.
 */
export const sanitizeKeyword = (raw) => {
  if (!raw) return "";
  return String(raw)
    .replace(/<[^>]*>/g, "")
    .replace(CONTROL_CHAR_REGEX, " ")
    .replace(/[<>"']/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_KEYWORD_LENGTH);
};

export const titleCaseKeyword = (kw) => {
  if (!kw) return "";
  return kw
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
};

/**
 * Pull the first non-empty search keyword from a parsed searchParams object.
 * Accepts either a plain object (from awaited Next searchParams) or a
 * URLSearchParams instance.
 */
export const extractSearchKeyword = (searchParams) => {
  if (!searchParams) return "";
  let sp = searchParams;
  if (
    typeof URLSearchParams !== "undefined" &&
    searchParams instanceof URLSearchParams
  ) {
    sp = Object.fromEntries(searchParams.entries());
  }
  for (const key of SEARCH_KEYS) {
    const value = sp[key];
    if (typeof value === "string" && value.trim()) {
      const cleaned = sanitizeKeyword(value);
      if (cleaned) return cleaned;
    }
    if (Array.isArray(value) && value[0]) {
      const cleaned = sanitizeKeyword(value[0]);
      if (cleaned) return cleaned;
    }
  }
  return "";
};

/**
 * Ensures title fits within MAX_TITLE_LENGTH and is suffixed with the brand.
 */
export const formatTitle = (title) => {
  if (!title) return SEO_CONFIG.siteName;
  const fullTitle = title.toLowerCase().includes("peckers")
    ? title
    : `${title}${SEO_CONFIG.titleSuffix}`;
  if (fullTitle.length > MAX_TITLE_LENGTH) {
    return fullTitle.substring(0, MAX_TITLE_LENGTH - 3).trimEnd() + "...";
  }
  return fullTitle;
};

/**
 * Ensures description fits within MAX_DESCRIPTION_LENGTH.
 */
export const formatDescription = (description) => {
  if (!description) {
    return SEO_CONFIG.defaultDescription.substring(0, MAX_DESCRIPTION_LENGTH);
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.substring(0, MAX_DESCRIPTION_LENGTH - 3).trimEnd() + "...";
  }
  return description;
};

const dedupe = (arr) => {
  const seen = new Set();
  const out = [];
  for (const item of arr || []) {
    if (!item) continue;
    const key = String(item).toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
};

/**
 * Generates a base metadata object (static).
 */
export const generateMetadataObject = ({
  title,
  description,
  keywords,
  path,
  image,
}) => {
  const formattedTitle = formatTitle(title);
  const formattedDesc = formatDescription(description);
  const url = `${SEO_CONFIG.baseUrl}${path || ""}`;
  const ogImage = image || SEO_CONFIG.defaultImage;

  return {
    title: formattedTitle,
    description: formattedDesc,
    keywords: dedupe(keywords),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url,
      siteName: SEO_CONFIG.siteName,
      images: [{ url: ogImage }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: formattedDesc,
      images: [ogImage],
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

/**
 * Generates dynamic metadata that adapts to the visitor's search keyword.
 *
 * - Reads keyword from searchParams (q, query, s, search, keyword, kw, term).
 * - When a keyword is present, the title/description/keywords list are
 *   rewritten so the rendered page surfaces the visitor's intent.
 * - Canonical always points to the clean path (no query string) so the
 *   crawler doesn't see duplicate URLs.
 *
 * @param {Object} opts
 * @param {Object|URLSearchParams|null} opts.searchParams parsed search params
 * @param {string} opts.title fallback (no-keyword) title
 * @param {string} opts.description fallback (no-keyword) description
 * @param {string[]} [opts.keywords] base keywords
 * @param {string} [opts.path] path used for canonical/og url
 * @param {string} [opts.image] OG image
 * @param {string} [opts.locationHint] e.g. "Stevenage", "Hitchin"
 */
export const generateDynamicMetadata = ({
  searchParams,
  title,
  description,
  keywords = [],
  path,
  image,
  locationHint,
}) => {
  const rawKeyword = extractSearchKeyword(searchParams);
  const keyword = titleCaseKeyword(rawKeyword);

  if (!keyword) {
    return generateMetadataObject({ title, description, keywords, path, image });
  }

  const lower = rawKeyword.toLowerCase();
  const locTag = locationHint ? ` in ${locationHint}` : "";
  const dynamicTitle = `${keyword}${locTag} | ${title}`;
  const dynamicDescription =
    `Looking for ${lower}${locTag}? ${description}`.replace(/\s+/g, " ");

  const dynamicKeywords = dedupe([
    lower,
    `${lower} near me`,
    `${lower} Stevenage`,
    `${lower} Hitchin`,
    `${lower} Hertfordshire`,
    `best ${lower}`,
    `Peckers ${lower}`,
    ...keywords,
  ]);

  return generateMetadataObject({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: dynamicKeywords,
    path,
    image,
  });
};

/**
 * Convenience wrapper for Next.js App Router `generateMetadata` functions.
 * Awaits searchParams (Next 15+) and forwards to generateDynamicMetadata.
 *
 *   export const generateMetadata = ({ searchParams }) =>
 *     buildPageMetadata({ searchParams, title: "...", description: "...", path: "..." });
 */
export const buildPageMetadata = async ({ searchParams, ...rest }) => {
  const resolved = searchParams ? await searchParams : null;
  return generateDynamicMetadata({ searchParams: resolved, ...rest });
};
