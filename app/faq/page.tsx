import FaqPage from "@/components/site/faq/FaqPage";
import JsonLd from "@/components/site/JsonLd";
import PageShell from "@/components/site/PageShell";
import { buildFaqJsonLd } from "@/lib/local-seo";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/faq",
  "Answers about Birdside HTX hours, location, online ordering, catering, menu items, hot chicken, and allergen information in Katy, TX."
);

export default function FaqRoutePage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd()} />
      <PageShell
        mainSlots={[
          <main key="faq" className="main-wrapper">
            <FaqPage />
          </main>
        ]}
      />
    </>
  );
}
