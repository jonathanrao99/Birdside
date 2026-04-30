import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import { getProductContent, getProductSlugs } from "@/lib/site-content";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const content = getProductContent(slug);

  if (!content) notFound();

  return <PageShell mainHtml={content.mainHtml} />;
}
