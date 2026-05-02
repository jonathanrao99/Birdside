/**
 * JSON-LD structured data helpers.
 *
 * These produce schema.org payloads that Google uses to render rich
 * results (knowledge panel, opening hours, breadcrumbs, menu, etc).
 */

import { SEO_CONFIG } from "./seo";

const BRAND = {
    legalName: "Peckers Chicken Ltd",
    name: "Peckers",
    sameAs: [
        "https://www.instagram.com/peckers_chicken/",
        "https://www.tiktok.com/@peckers_chicken",
        "https://www.facebook.com/peckerschicken",
    ],
    logo: `${SEO_CONFIG.baseUrl}/Peckers Logo 1 [Vectorized].svg`,
};

const LOCATIONS = {
    hitchin: {
        "@type": "Restaurant",
        "@id": `${SEO_CONFIG.baseUrl}/hitchin#restaurant`,
        name: "Peckers Hitchin",
        url: `${SEO_CONFIG.baseUrl}/hitchin`,
        image: `${SEO_CONFIG.baseUrl}/Peckers Logo 1 [Vectorized].svg`,
        priceRange: "££",
        servesCuisine: ["Fried Chicken", "Grilled Chicken", "Peri-Peri", "Burgers"],
        address: {
            "@type": "PostalAddress",
            streetAddress: "25 John Barker Place",
            addressLocality: "Hitchin",
            addressRegion: "Hertfordshire",
            postalCode: "SG5 2BT",
            addressCountry: "GB",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 51.9534,
            longitude: -0.2873,
        },
        openingHoursSpecification: weekHours(),
        acceptsReservations: false,
    },
    stevenage: {
        "@type": "Restaurant",
        "@id": `${SEO_CONFIG.baseUrl}/stevenage#restaurant`,
        name: "Peckers Stevenage",
        url: `${SEO_CONFIG.baseUrl}/stevenage`,
        image: `${SEO_CONFIG.baseUrl}/Peckers Logo 1 [Vectorized].svg`,
        priceRange: "££",
        servesCuisine: ["Fried Chicken", "Grilled Chicken", "Peri-Peri", "Burgers"],
        address: {
            "@type": "PostalAddress",
            streetAddress: "Hertford Road, Bragbury End",
            addressLocality: "Stevenage",
            addressRegion: "Hertfordshire",
            postalCode: "SG2 8UD",
            addressCountry: "GB",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 51.8843,
            longitude: -0.1521,
        },
        openingHoursSpecification: weekHours(),
        acceptsReservations: false,
    },
};

function weekHours() {
    return [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "11:00",
            closes: "22:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Friday", "Saturday"],
            opens: "11:00",
            closes: "23:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "12:00",
            closes: "21:30",
        },
    ];
}

/**
 * The brand's Organization schema. Use once on the home page.
 */
export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SEO_CONFIG.baseUrl}#organization`,
        name: BRAND.name,
        legalName: BRAND.legalName,
        url: SEO_CONFIG.baseUrl,
        logo: BRAND.logo,
        sameAs: BRAND.sameAs,
    };
}

/**
 * The site's WebSite schema with sitelinks search box. Helps Google show a
 * search box under your brand result.
 */
export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SEO_CONFIG.baseUrl}#website`,
        name: BRAND.name,
        url: SEO_CONFIG.baseUrl,
        publisher: { "@id": `${SEO_CONFIG.baseUrl}#organization` },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SEO_CONFIG.baseUrl}/menu?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

/**
 * Restaurant chain schema with both physical locations as departments.
 * Use on the home page only.
 */
export function restaurantChainSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": `${SEO_CONFIG.baseUrl}#restaurant`,
        name: BRAND.name,
        url: SEO_CONFIG.baseUrl,
        image: BRAND.logo,
        priceRange: "££",
        servesCuisine: ["Fried Chicken", "Grilled Chicken", "Peri-Peri", "Burgers"],
        areaServed: ["Stevenage", "Hitchin", "Hertfordshire"],
        hasMenu: `${SEO_CONFIG.baseUrl}/menu`,
        department: [LOCATIONS.hitchin, LOCATIONS.stevenage],
        sameAs: BRAND.sameAs,
    };
}

/**
 * Per-location Restaurant schema. Pass slug "hitchin" or "stevenage".
 */
export function locationSchema(slug, overrides = {}) {
    const base = LOCATIONS[slug];
    if (!base) return null;
    return {
        "@context": "https://schema.org",
        ...base,
        ...overrides,
    };
}

/**
 * Build a BreadcrumbList from an array of {name, path} entries (root first).
 */
export function breadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: it.path?.startsWith("http")
                ? it.path
                : `${SEO_CONFIG.baseUrl}${it.path}`,
        })),
    };
}

/**
 * Restaurant menu schema (the whole menu as MenuSections + MenuItems).
 * Use on /menu landing.
 */
export function menuSchema(sections) {
    return {
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": `${SEO_CONFIG.baseUrl}/menu#menu`,
        name: "Peckers Menu",
        url: `${SEO_CONFIG.baseUrl}/menu`,
        hasMenuSection: sections.map((s) => ({
            "@type": "MenuSection",
            name: s.name,
            url: `${SEO_CONFIG.baseUrl}${s.path}`,
            description: s.description || undefined,
        })),
    };
}

/**
 * FAQ schema. Pass an array of { question, answer }.
 */
export function faqSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };
}
