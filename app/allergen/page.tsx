import PlaceholderDoc from "@/components/site/placeholder-doc/PlaceholderDoc";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/allergen",
  "Allergen and ingredient information for Birdside HTX. Detailed guide coming soon."
);

export default function AllergenPage() {
  return (
    <PageShell
      mainSlots={[
        <PlaceholderDoc key="allergen" title="Allergen information">
          <p>
            We take allergies seriously. A full allergen breakdown by menu item
            will live here soon. Until then, please ask a team member in-store or
            reach out before you order if you have a severe allergy.
          </p>
          <p>
            Email{" "}
            <a href="mailto:birdsidehtx@gmail.com?subject=Allergens">
              birdsidehtx@gmail.com
            </a>{" "}
            for ingredient questions.
          </p>
        </PlaceholderDoc>
      ]}
    />
  );
}
