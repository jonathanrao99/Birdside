import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata({ searchParams }) {
    return buildPageMetadata({
        searchParams,
        title: "Allergen Guide",
        description:
            "Peckers allergen information and ingredient guide. Find allergens for every dish across our Stevenage and Hitchin menus before you order.",
        keywords: [
            "allergen guide",
            "Peckers allergens",
            "chicken allergens Stevenage",
            "chicken allergens Hitchin",
            "gluten free chicken",
            "menu allergens",
            "food allergy info",
        ],
        path: "/menu/allergens",
    });
}

export default function MenuAllergensLayout({ children }) {
    return children;
}
