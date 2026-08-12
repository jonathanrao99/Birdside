import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/site/JsonLd";
import LocationDetailPage from "@/components/site/location-detail/LocationDetailPage";
import PageShell from "@/components/site/PageShell";
import { buildBreadcrumbJsonLd } from "@/lib/local-seo";
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

  if (slug === "katy-tx") {
    return (
      <>
        <JsonLd
          data={buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: "Katy, TX", path: content.route }
          ])}
        />
        <PageShell
          mainSlots={[<LocationDetailPage key="katy-location" />]}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: content.title.split(/[|—]/)[0]?.trim() || slug, path: content.route }
        ])}
      />
      <PageShell mainHtml={content.mainHtml} />
    </>
  );
}
