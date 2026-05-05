import NextLocationSuggest from "@/components/site/NextLocationSuggest";
import PageShell from "@/components/site/PageShell";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import { injectNextLocationPlaceholder } from "@/lib/split-page-html";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/locations");

export default function LocationsPage() {
  const content = getRouteContent("/locations");
  if (!content) notFound();

  return (
    <PageShell
      mainSlots={[
        injectNextLocationPlaceholder(content.mainHtml),
        <NextLocationSuggest key="next-location" />
      ]}
    />
  );
}
