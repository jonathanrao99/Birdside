import SaucesPageClient from "./page-client";
import { sanityFetch } from "../../sanity/lib/live";
import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "House-Made Sauces - Artisan Dips & Flavours",
    description:
      "Explore Peckers house-made sauces. From Honey Glaze BBQ to Hot Honey, we've perfected the blend for the best chicken experience in Stevenage and Hitchin.",
    keywords: [
      "best chicken sauces Stevenage",
      "Peckers house-made dips",
      "hot honey chicken Hitchin",
      "BBQ sauce UK",
      "Peckers secret sauce",
      "artisan chicken dips",
      "house made sauces",
      "chicken dipping sauce",
    ],
    path: "/house-made-sauces",
  });
}

export default async function SaucesPage() {
  const { data: saucesData } = await sanityFetch({
    query: `*[_type == "saucePage"] | order(_createdAt asc)`,
  });

  return <SaucesPageClient initialSaucesData={saucesData} />;
}
