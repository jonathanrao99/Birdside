import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/site/JsonLd";
import LocationDetailPage from "@/components/site/location-detail/LocationDetailPage";
import PageShell from "@/components/site/PageShell";
import { LOCAL_BUSINESS } from "@/lib/local-seo";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-url";
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

function locationJsonLd(route: string) {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${route}`;
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FastFoodRestaurant"],
    "@id": `${url}#restaurant`,
    name: `${LOCAL_BUSINESS.name} - ${LOCAL_BUSINESS.addressLocality}`,
    url,
    telephone: LOCAL_BUSINESS.phone,
    priceRange: LOCAL_BUSINESS.priceRange,
    servesCuisine: LOCAL_BUSINESS.servesCuisine,
    image: new URL(LOCAL_BUSINESS.imagePath, base).toString(),
    hasMap: LOCAL_BUSINESS.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCAL_BUSINESS.streetAddress,
      addressLocality: LOCAL_BUSINESS.addressLocality,
      addressRegion: LOCAL_BUSINESS.addressRegion,
      postalCode: LOCAL_BUSINESS.postalCode,
      addressCountry: LOCAL_BUSINESS.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOCAL_BUSINESS.latitude,
      longitude: LOCAL_BUSINESS.longitude
    },
    openingHoursSpecification: LOCAL_BUSINESS.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes
    }))
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const content = getLocationContent(slug);

  if (!content) notFound();

  if (slug === "katy-tx") {
    return (
      <>
        <JsonLd data={locationJsonLd(content.route)} />
        <PageShell
          mainSlots={[<LocationDetailPage key="katy-location" />]}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd data={locationJsonLd(content.route)} />
      <PageShell mainHtml={content.mainHtml} />
    </>
  );
}
