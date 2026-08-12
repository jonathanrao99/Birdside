import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/site/JsonLd";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import { buildBreadcrumbJsonLd } from "@/lib/local-seo";
import { getOurMenuData } from "@/lib/our-menu-data";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getBalancedProductMainHtml } from "@/lib/split-page-html";
import { getSiteUrl } from "@/lib/site-url";
import { getProductContent, getProductSlugs } from "@/lib/site-content";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

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

function parsePrice(price: string) {
  const match = price.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/);
  return match?.[1];
}

function productJsonLd(slug: string, content: { title: string; description: string; route: string }) {
  const base = getSiteUrl().replace(/\/$/, "");
  const productName = content.title.split(/[|—]/)[0]?.trim() || slug;
  const menuItem = getOurMenuData()
    ?.tabs.flatMap((tab) => tab.items)
    .find((item) => item.productHref === content.route);
  const price = menuItem ? parsePrice(menuItem.price) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: content.description.trim(),
    brand: { "@type": "Brand", name: "Birdside HTX" },
    category: "Restaurant menu item",
    url: `${base}${content.route}`,
    ...(menuItem ? { image: new URL(menuItem.imageSrc, base).toString() } : {}),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${base}${content.route}`
          }
        }
      : {})
  };
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
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
            { name: content.title.split(/[|—]/)[0]?.trim() || slug, path: content.route }
          ]),
          jsonLd
        ]}
      />
      <PageShell mainSlots={mainSlots} />
    </>
  );
}
