import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/site/JsonLd";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import menuData from "@/content/generated/our-menu.json";
import { LOCAL_BUSINESS } from "@/lib/local-seo";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getBalancedProductMainHtml } from "@/lib/split-page-html";
import { getSiteUrl } from "@/lib/site-url";
import { getProductContent, getProductSlugs } from "@/lib/site-content";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

type MenuItem = (typeof menuData.tabs)[number]["items"][number];

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getProductContent(slug);
  if (!content) return {};
  return buildPageMetadata(content.route, content);
}

function findMenuItem(route: string): MenuItem | undefined {
  for (const tab of menuData.tabs) {
    const item = tab.items.find((candidate) => candidate.productHref === route);
    if (item) return item;
  }
}

function parsePrices(price: string | undefined) {
  return price?.match(/\d+(?:\.\d{1,2})?/g)?.map(Number).filter(Number.isFinite) ?? [];
}

function buildOffer(price: string | undefined, url: string) {
  const prices = parsePrices(price);
  if (prices.length === 0) return undefined;

  const baseOffer = {
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url
  };

  if (prices.length === 1) {
    return {
      "@type": "Offer",
      ...baseOffer,
      price: prices[0].toFixed(2)
    };
  }

  return {
    "@type": "AggregateOffer",
    ...baseOffer,
    lowPrice: Math.min(...prices).toFixed(2),
    highPrice: Math.max(...prices).toFixed(2),
    offerCount: prices.length
  };
}

function productJsonLd(slug: string, content: { title: string; description: string; route: string }) {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${content.route}`;
  const menuItem = findMenuItem(content.route);
  const productName = content.title.split(/[|—]/)[0]?.trim() || slug;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: content.description.trim(),
    brand: { "@type": "Brand", name: LOCAL_BUSINESS.name },
    category: "Restaurant menu item",
    url,
    image: menuItem?.imageSrc ? new URL(menuItem.imageSrc, base).toString() : undefined,
    offers: buildOffer(menuItem?.price, url)
  };

  return Object.fromEntries(Object.entries(jsonLd).filter(([, value]) => value !== undefined));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const content = getProductContent(slug);

  if (!content) notFound();

  const jsonLd = productJsonLd(slug, content);
  const balancedMain = getBalancedProductMainHtml(content.mainHtml);
  const mainSlots = [
    balancedMain,
    <PatternStrip key="product-pattern" tone="black" />,
    <OurMenu key="our-menu" />
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageShell mainSlots={mainSlots} />
    </>
  );
}
