import { sanityFetch } from "../../sanity/lib/live";
import UniquenessPageClient from "./page-client";
import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "The Peckers Standard",
        description:
            "What makes Peckers unique. From artisan preparation to our commitment to serving Seriously Good Chicken in every bite, in Stevenage and Hitchin.",
        keywords: [
            "Peckers standard of quality",
            "best chicken Hertfordshire",
            "fresh chicken Stevenage",
            "premium grilled chicken standards",
            "Hitchin top chicken restaurant",
            "quality food standards UK",
            "artisan chicken preparation",
            "Seriously Good Chicken",
        ],
        path: "/the-peckers-standard",
    });
}


export default async function UniquenessPage() {
    // Fetch all uniqueness related data on the server
    const { data } = await sanityFetch({
        query: `{
        "landingData": *[_type == "uniquenessLanding"][0],
        "sectionsData": *[_type == "uniquenessSubSection"][0].sections[] {
            ...,
            "image": image {
                asset-> {
                    ...,
                    metadata {
                        dimensions
                    }
                }
            },
            "videoUrl": video.asset->url
        }
    }`
    });

    return <UniquenessPageClient initialData={data} />;
}
