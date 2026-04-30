import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import { getLocationContent, getLocationSlugs } from "@/lib/site-content";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const content = getLocationContent(slug);

  if (!content) notFound();

  return <PageShell mainHtml={content.mainHtml} />;
}
