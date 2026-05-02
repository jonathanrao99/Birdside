import { LocationsPageContent } from "../hitchin/LocationsPageContent";
import { sanityFetch } from "../../sanity/lib/live";
import { buildPageMetadata } from "../lib/seo";
import JsonLd from "../components/JsonLd";
import { locationSchema, breadcrumbSchema } from "../lib/structured-data";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Peckers Stevenage | Best Chicken in Stevenage | Fried & Grilled",
        description:
            "Searching for the best chicken in Stevenage? Peckers on Hertford Rd serves freshly fried and flame-grilled chicken, gourmet burgers, wings, and signature peri-peri.",
        keywords: [
            "best chicken in Stevenage",
            "chicken near me Stevenage",
            "places to eat in Stevenage",
            "food in Stevenage",
            "fried chicken Stevenage",
            "grilled chicken Stevenage",
            "peri peri chicken Stevenage",
            "chicken takeaway Stevenage",
            "best takeaway in Stevenage",
            "burger Stevenage",
            "chicken burgers Stevenage",
            "chicken wings Stevenage",
            "chicken delivery Stevenage",
            "lunch Stevenage",
            "dinner Stevenage",
            "restaurants in Stevenage",
            "where to eat Stevenage SG2",
            "takeaway Stevenage SG2",
            "Bragbury End food",
            "Peckers Stevenage",
            "late night food Stevenage",
        ],
        path: "/stevenage",
        locationHint: "Stevenage",
    });
}


export default async function StevenagePage() {
    const location = "stevenage";
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
                    locationSchema("stevenage"),
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Stevenage", path: "/stevenage" },
                    ]),
                ]}
            />
            <LocationsPageContent location={location} initialData={data} />
        </>
    );
}
