import { SEO_CONFIG } from "./lib/seo";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/studio/",
                    "/debug-env/",
                    "/_next/",
                ],
            },
        ],
        sitemap: `${SEO_CONFIG.baseUrl}/sitemap.xml`,
        host: SEO_CONFIG.baseUrl,
    };
}
