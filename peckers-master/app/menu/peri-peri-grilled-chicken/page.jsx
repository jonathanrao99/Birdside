import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Peri-Peri Grilled Chicken Menu",
        description:
            "Healthy and delicious flame-grilled peri-peri chicken at Peckers. Choose your marinade and enjoy protein-packed health boxes and grilled platters.",
        keywords: [
            "peri peri chicken",
            "grilled chicken",
            "flame grilled chicken",
            "peri peri Stevenage",
            "peri peri Hitchin",
            "grilled chicken near me",
            "healthy chicken meal",
            "Peckers peri peri",
        ],
        path: "/menu/peri-peri-grilled-chicken",
    });
}

export default async function PeriPeriGrillPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        periPeriGrillCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.periPeriGrillCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Grilled+Chicken",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Peri-Peri Grilled Chicken"
                categoryPath="/menu/peri-peri-grilled-chicken"
                items={initialItems}
            />
            <GenericMenuPageClient
                initialItems={initialItems}
                initialNavbarData={navbarData}
                categoryName="PERI-PERI GRILLED CHICKEN"
            />
        </>
    );
}
