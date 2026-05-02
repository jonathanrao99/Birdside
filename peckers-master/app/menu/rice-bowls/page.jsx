import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Rice Bowls Menu",
        description:
            "Discover Peckers chicken rice bowls, from the OG to the fiery Buffalo Soldier. High-protein chicken meals in Stevenage and Hitchin.",
        keywords: [
            "chicken rice bowl",
            "rice bowl Stevenage",
            "rice bowl Hitchin",
            "high protein chicken bowl",
            "Buffalo Soldier rice bowl",
            "Peckers rice bowls",
        ],
        path: "/menu/rice-bowls",
    });
}

export default async function RiceBowlsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        riceBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const finalItems = (data?.riceBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Rice+Bowl",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Rice Bowls"
                categoryPath="/menu/rice-bowls"
                items={finalItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="RICE BOWLS"
            />
        </>
    );
}
