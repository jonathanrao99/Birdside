import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Drinks & Desserts Menu",
        description:
            "Indulge in thick creamy milkshakes and delicious desserts at Peckers. From Kunafa Dubai Chocolate to classic Oreo in Stevenage and Hitchin.",
        keywords: [
            "drinks Stevenage",
            "drinks Hitchin",
            "milkshakes",
            "chicken shop desserts",
            "desserts near me",
            "Dubai chocolate dessert",
            "Peckers drinks menu",
        ],
        path: "/menu/drinks-and-desserts",
    });
}

export default async function DrinksAndDessertsPage() {
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

    const finalItems = (data?.shakesCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Drink",
    }));

    return (
        <>
            <MenuPageJsonLd
                categoryName="Drinks & Desserts"
                categoryPath="/menu/drinks-and-desserts"
                items={finalItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="DRINKS & DESSERTS"
            />
        </>
    );
}
