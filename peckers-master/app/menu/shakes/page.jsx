import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Shakes Menu",
        description:
            "Indulge in our thick and creamy milkshakes at Peckers. From Kunafa Dubai Chocolate to classic Oreo and Lotus Biscoff in Stevenage and Hitchin.",
        keywords: [
            "milkshakes",
            "shakes Stevenage",
            "shakes Hitchin",
            "thick milkshakes",
            "Dubai chocolate shake",
            "Oreo milkshake",
            "Lotus Biscoff shake",
            "best shakes near me",
            "Peckers shakes",
        ],
        path: "/menu/shakes",
    });
}

export default async function ShakesPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        shakesCarousel[] { name, image, boost, ingredients, allergens, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.shakesCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Shake",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Shakes"
                categoryPath="/menu/shakes"
                items={initialItems}
            />
            <GenericMenuPageClient
                initialItems={initialItems}
                initialNavbarData={navbarData}
                categoryName="SHAKES"
            />
        </>
    );
}
