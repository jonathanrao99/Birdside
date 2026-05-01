import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
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

function productJsonLd(slug: string, content: { title: string; description: string; route: string }) {
  const base = getSiteUrl().replace(/\/$/, "");
  const productName = content.title.split(/[|—]/)[0]?.trim() || slug;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: content.description.trim(),
    brand: { "@type": "Brand", name: "Birdside HTX" },
    category: "Restaurant menu item",
    url: `${base}${content.route}`
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell mainSlots={mainSlots} />
    </>
  );
}
