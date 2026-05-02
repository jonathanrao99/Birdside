import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "What's New",
        description:
            "Check out the latest additions to the Peckers menu. From grilled specialties to new burger flavours, fresh drops in Stevenage and Hitchin.",
        keywords: [
            "new menu items",
            "Peckers new menu",
            "latest chicken menu",
            "new burgers Stevenage",
            "new burgers Hitchin",
            "menu updates",
            "what's new at Peckers",
        ],
        path: "/menu/whats-new",
    });
}

export default async function WhatsNewPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        whatsNewCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.whatsNewCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Whats+New",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="What's New"
                categoryPath="/menu/whats-new"
                items={initialItems}
            />
            <GenericMenuPageClient
                initialItems={initialItems}
                initialNavbarData={navbarData}
                categoryName="WHAT'S NEW"
            />
        </>
    );
}
