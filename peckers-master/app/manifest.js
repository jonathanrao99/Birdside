import { SEO_CONFIG } from "./lib/seo";

export default function manifest() {
    return {
        name: "Peckers - Seriously Good Chicken",
        short_name: "Peckers",
        description: SEO_CONFIG.defaultDescription,
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#C41718",
        orientation: "portrait",
        scope: "/",
        lang: "en-GB",
        categories: ["food", "lifestyle", "restaurant"],
        icons: [
            { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
            {
                src: "/Peckers Logo 1 [Vectorized].svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "any maskable",
            },
        ],
    };
}
