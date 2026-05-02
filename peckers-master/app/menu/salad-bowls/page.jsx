import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Salad Bowls Menu",
        description:
            "Fresh and healthy chicken salad bowls at Peckers. Try the OG Salad or the Seoul-inspired Hert & Seoul bowl in Stevenage and Hitchin.",
        keywords: [
            "chicken salad",
            "salad bowl Stevenage",
            "salad bowl Hitchin",
            "healthy chicken salad",
            "high protein salad",
            "Hert and Seoul bowl",
            "Peckers salad",
        ],
        path: "/menu/salad-bowls",
    });
}

export default async function SaladBowlsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        saladBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const finalItems = (data?.saladBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Salad+Bowl",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Salad Bowls"
                categoryPath="/menu/salad-bowls"
                items={finalItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="SALAD BOWLS"
            />
        </>
    );
}
