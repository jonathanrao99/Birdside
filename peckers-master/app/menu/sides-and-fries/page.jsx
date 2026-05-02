import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Sides & Fries Menu",
        description:
            "Complete your meal with crispy fries, cheesy loaded fries, halloumi, and more from Peckers in Stevenage and Hitchin.",
        keywords: [
            "fries",
            "loaded fries",
            "chicken sides",
            "halloumi fries",
            "sides Stevenage",
            "sides Hitchin",
            "best fries near me",
            "Peckers sides",
        ],
        path: "/menu/sides-and-fries",
    });
}

export default async function SidesAndFriesPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        sidesAndFriesCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.sidesAndFriesCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Side+Item",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Sides & Fries"
                categoryPath="/menu/sides-and-fries"
                items={initialItems}
            />
            <GenericMenuPageClient
                initialItems={initialItems}
                initialNavbarData={navbarData}
                categoryName="SIDES"
            />
        </>
    );
}
