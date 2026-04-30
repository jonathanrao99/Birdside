import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getLocationContent, getLocationSlugs } from "@/lib/site-content";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getLocationContent(slug);
  if (!content) return {};
  return buildPageMetadata(content.route, content);
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const content = getLocationContent(slug);

  if (!content) notFound();

  return <PageShell mainHtml={content.mainHtml} />;
}
