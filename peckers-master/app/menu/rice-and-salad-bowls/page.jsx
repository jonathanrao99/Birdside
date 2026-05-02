import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Rice & Salad Bowls Menu",
        description:
            "Discover Peckers chicken rice and salad bowls. Fresh, healthy, and seriously good chicken bowls in Stevenage and Hitchin.",
        keywords: [
            "chicken rice bowl",
            "chicken salad bowl",
            "healthy chicken meal",
            "rice bowl Stevenage",
            "salad bowl Hitchin",
            "high protein bowl",
            "Peckers bowls",
        ],
        path: "/menu/rice-and-salad-bowls",
    });
}

export default async function RiceAndSaladBowlsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        riceBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText },
        saladBowlsCarousel[] { name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const riceItems = (data?.riceBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Rice+Bowl",
    }));

    const saladItems = (data?.saladBowlsCarousel || []).map(item => ({
        ...item,
        image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Salad+Bowl",
    }));

    const finalItems = [...riceItems, ...saladItems];

    return (
        <>
            <MenuPageJsonLd
                categoryName="Rice & Salad Bowls"
                categoryPath="/menu/rice-and-salad-bowls"
                items={finalItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="RICE & SALAD BOWLS"
            />
        </>
    );
}
