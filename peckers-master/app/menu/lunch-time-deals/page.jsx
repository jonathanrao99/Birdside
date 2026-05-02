import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";
import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Lunch Time Deals",
        description:
            "Grab amazing lunch time deals at Peckers. Great value chicken combos in Stevenage and Hitchin. Eat in, collect or order delivery.",
        keywords: [
            "lunch deals",
            "lunch offers Stevenage",
            "lunch offers Hitchin",
            "chicken lunch deal",
            "cheap lunch near me",
            "Peckers lunch menu",
            "lunch combo Hertfordshire",
        ],
        path: "/menu/lunch-time-deals",
    });
}

const DEFAULT_DATA = [
    { name: "Coming Soon", ingredients: "Our special Lunch Time Deals are coming soon! Check back later.", calories: "-", protein: "-", carbs: "-", fats: "-", allergens: "-", spiceLevel: "0", image: "https://placehold.co/600x600/000000/FFFFFF/png?text=Lunch+Deals" },
];

export default async function LunchDealsPage() {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
        lunchDealsCarousel[] { name, image, boost, ingredients, protein, carbs, fats, calories, energy, allergens, spiceLevel, availabilityText }
    }`
    });

    const { data: navbarData } = await sanityFetch({
        query: `*[_type == "menuNavbar"][0].menuItems[] {
        title, link, isActive
    }`
    });

    const initialItems = (data?.lunchDealsCarousel || []).map((item) => ({
        ...item,
        ingredients: (item.ingredients && item.ingredients !== "-") ? item.ingredients : undefined,
        calories: (item.calories && item.calories !== "-" && item.calories !== "—") ? item.calories : undefined,
        protein: (item.protein && item.protein !== "-" && item.protein !== "—") ? item.protein : undefined,
        carbs: (item.carbs && item.carbs !== "-" && item.carbs !== "—") ? item.carbs : undefined,
        fats: (item.fats && item.fats !== "-" && item.fats !== "—") ? item.fats : undefined,
        energy: (item.energy && item.energy !== "-" && item.energy !== "—") ? item.energy : undefined,
        image: item.image ? urlFor(item.image).url() : "/images/burgers/default.png",
        boost: item.boost || 1,
    }));

    const finalItems = initialItems.length > 0 ? initialItems : DEFAULT_DATA;

    return (
        <>
            <MenuPageJsonLd
                categoryName="Lunch Time Deals"
                categoryPath="/menu/lunch-time-deals"
                items={initialItems}
            />
            <GenericMenuPageClient
                initialItems={finalItems}
                initialNavbarData={navbarData}
                categoryName="LUNCH TIME DEALS"
            />
        </>
    );
}
