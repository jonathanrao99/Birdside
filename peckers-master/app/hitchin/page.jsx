import { LocationsPageContent } from "./LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";
import { buildPageMetadata } from "../lib/seo";
import JsonLd from "../components/JsonLd";
import { locationSchema, breadcrumbSchema } from "../lib/structured-data";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Peckers Hitchin | Best Chicken in Hitchin | Fried & Grilled",
        description:
            "Craving the best chicken in Hitchin? Peckers at 25 John Barker Place serves freshly fried and flame-grilled chicken, gourmet burgers, wings, and signature peri-peri.",
        keywords: [
            "best chicken in Hitchin",
            "chicken near me Hitchin",
            "places to eat in Hitchin",
            "food in Hitchin",
            "fried chicken Hitchin",
            "grilled chicken Hitchin",
            "peri peri chicken Hitchin",
            "chicken takeaway Hitchin",
            "best takeaway in Hitchin",
            "burger Hitchin",
            "chicken burgers Hitchin",
            "chicken wings Hitchin",
            "chicken delivery Hitchin",
            "lunch Hitchin",
            "dinner Hitchin",
            "restaurants Hitchin town centre",
            "where to eat Hitchin SG5",
            "takeaway Hitchin SG5",
            "chicken shop Hitchin",
            "Peckers Hitchin",
            "Westmill Hitchin food",
        ],
        path: "/hitchin",
        locationHint: "Hitchin",
    });
}


export default async function LocationPage() {
    const location = "hitchin";
    const query = `*[_type == "locationpage" && (slug.current == $location || lower(name) == lower($location))][0]{
        ...,
        "videoUrl": heroVideo.asset->url,
        "posterUrl": heroPoster.asset->url,
        heroVideoUrl
    }`;
    const { data } = await sanityFetch({
        query: query,
        params: { location }
    });

    return (
        <>
            <JsonLd
                data={[
                    locationSchema("hitchin"),
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Hitchin", path: "/hitchin" },
                    ]),
                ]}
            />
            <LocationsPageContent location={location} initialData={data} />
        </>
    );
}
