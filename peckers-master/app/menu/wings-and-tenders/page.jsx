import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Wings & Tenders Menu",
        description:
            "Signature southern fried or flame-grilled wings and buttermilk tenders, coated in Peckers house-made sauces. Best wings in Stevenage and Hitchin.",
        keywords: [
            "chicken wings",
            "buttermilk tenders",
            "wings and tenders",
            "wings Stevenage",
            "wings Hitchin",
            "tenders near me",
            "southern fried wings",
            "Peckers wings and tenders",
        ],
        path: "/menu/wings-and-tenders",
    });
}

export default async function WingsPage() {
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

    const finalItems = (data?.wingsAndTendersCarousel || []).map(item => {
        const isWing = item.name?.toLowerCase().includes("wing");
        const placeholder = isWing ? "https://placehold.co/600x600/000000/FFFFFF/png?text=Wing" : "https://placehold.co/600x600/000000/FFFFFF/png?text=Tender";
        
        return {
            ...item,
            image: item.image ? urlFor(item.image).url() : placeholder,
        };
    });

    return (
        <>
            <MenuPageJsonLd
                categoryName="Wings & Tenders"
                categoryPath="/menu/wings-and-tenders"
                items={finalItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="WINGS & TENDERS"
            />
        </>
    );
}
