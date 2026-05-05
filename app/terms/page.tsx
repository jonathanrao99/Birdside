import PlaceholderDoc from "@/components/site/placeholder-doc/PlaceholderDoc";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/terms",
  "Terms of service for Birdside HTX. Full terms are coming soon."
);

export default function TermsPage() {
  return (
    <PageShell
      mainSlots={[
        <PlaceholderDoc key="terms" title="Terms of service">
          <p>
            Official terms for using our website, ordering, and promotions will
            be published here. This is a temporary summary page.
          </p>
          <p>
            For questions, reach us at{" "}
            <a href="mailto:birdsidehtx@gmail.com?subject=Terms">
              birdsidehtx@gmail.com
            </a>
            .
          </p>
        </PlaceholderDoc>
      ]}
    />
  );
}
