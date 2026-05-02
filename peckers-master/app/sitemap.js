import { SEO_CONFIG } from "./lib/seo";

const BASE_URL = SEO_CONFIG.baseUrl;

const STATIC_ROUTES = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
    { path: "/stevenage", priority: 0.9, changeFrequency: "monthly" },
    { path: "/hitchin", priority: 0.9, changeFrequency: "monthly" },
    { path: "/the-journey", priority: 0.7, changeFrequency: "monthly" },
    { path: "/the-peckers-standard", priority: 0.7, changeFrequency: "monthly" },
    { path: "/house-made-sauces", priority: 0.8, changeFrequency: "monthly" },
    { path: "/rewards", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.6, changeFrequency: "monthly" },
    { path: "/allergens", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

const MENU_ROUTES = [
    "/menu/peri-peri-grilled-chicken",
    "/menu/wings",
    "/menu/tenders",
    "/menu/wings-and-tenders",
    "/menu/wraps",
    "/menu/sides-and-fries",
    "/menu/shakes",
    "/menu/drinks-and-desserts",
    "/menu/kids",
    "/menu/whats-new",
    "/menu/meal-box",
    "/menu/lunch-time-deals",
    "/menu/rice-bowls",
    "/menu/salad-bowls",
    "/menu/rice-and-salad-bowls",
    "/menu/allergens",
];

export default function sitemap() {
    const now = new Date();

    const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
    }));

    const menuEntries = MENU_ROUTES.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticEntries, ...menuEntries];
}
