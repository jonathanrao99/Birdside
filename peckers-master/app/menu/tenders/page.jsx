import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Buttermilk Tenders Menu",
        description:
            "Try our signature southern fried buttermilk chicken tenders, coated in Peckers house-made sauces. Best chicken tenders in Stevenage and Hitchin.",
        keywords: [
            "chicken tenders",
            "buttermilk tenders",
            "tenders near me",
            "tenders Stevenage",
            "tenders Hitchin",
            "fried chicken tenders",
            "Peckers tenders",
        ],
        path: "/menu/tenders",
    });
}

export default async function TendersPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        wingsAndTendersCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    // Filter to only show Tenders
    const finalItems = (data?.wingsAndTendersCarousel || [])
        .filter(item => item.name?.toLowerCase().includes("tender"))
        .map(item => ({
            ...item,
            image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Tender",
        }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Tenders"
                categoryPath="/menu/tenders"
                items={finalItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="TENDERS"
            />
        </>
    );
}
