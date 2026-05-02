import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import GenericMenuPageClient from "../components/MenuPageClient";

import { buildPageMetadata } from "../../lib/seo";
import MenuPageJsonLd from "../components/MenuPageJsonLd";

export async function generateMetadata({ searchParams }) {
    const { data } = await sanityFetch({
        query: `*[_type == "menuPage"][0] {
            wrapsCarousel[] { name }
        }`
    });

    const items = data?.wrapsCarousel || [];
    const itemNames = items.map(i => i.name).slice(0, 5).join(", ");

    return buildPageMetadata({
        searchParams,
        title: "Wraps Menu",
        description: `Explore our chicken wraps: ${itemNames}, and more. Hand-crafted with premium ingredients in Stevenage & Hitchin.`,
        keywords: [
            "chicken wraps",
            "Peckers wraps",
            "wraps near me",
            "wraps Stevenage",
            "wraps Hitchin",
            "Stevenage takeaway",
            "Hitchin food",
            ...items.map(i => i.name),
        ],
        path: "/menu/wraps",
    });
}

export default async function WrapsPage() {
  const { data } = await sanityFetch({
    query: `*[_type == "menuPage"][0] {
    wrapsCarousel[] {
      name, image, boost, ingredients, calories, protein, carbs, fats, energy, allergens, spiceLevel, availabilityText
    }
  }`
  });

  const { data: navbarData } = await sanityFetch({
    query: `*[_type == "menuNavbar"][0].menuItems[] {
    title, link, isActive
  }`
  });

  const finalWraps = (data?.wrapsCarousel || []).map(item => ({
    ...item,
    image: item.image ? urlFor(item.image).url() : "https://placehold.co/600x600/000000/FFFFFF/png?text=Peckers+Wrap",
  }));

  return (
    <>
      <MenuPageJsonLd
        categoryName="Wraps"
        categoryPath="/menu/wraps"
        items={finalWraps}
      />
      <GenericMenuPageClient
        initialItems={finalWraps}
        initialNavbarData={navbarData}
        categoryName="WRAPS"
      />
    </>
  );
}
