import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Meal Boxes",
        description:
            "Peckers signature meal boxes. The OG Meal Box, Supercharged, and Peri-Peri Grilled chicken combos with fries and sides in Stevenage and Hitchin.",
        keywords: [
            "chicken meal box",
            "meal box Stevenage",
            "meal box Hitchin",
            "wings tenders combo",
            "OG meal box",
            "peri peri meal combo",
            "Peckers meal deal",
        ],
        path: "/menu/meal-box",
    });
}

export default async function MealBoxPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        mealBoxCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.mealBoxCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Meal+Box",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Meal Box"
                categoryPath="/menu/meal-box"
                items={initialItems}
            />
            <GenericMenuPageClient
                initialItems={initialItems}
                initialNavbarData={navbarData}
                categoryName="MEAL BOX"
            />
        </>
    );
}
