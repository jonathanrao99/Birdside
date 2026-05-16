import CateringPage from "@/components/site/catering/CateringPage";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/catering",
  "Hot chicken catering in Katy — trays, wings, tenders, sides, and house sauces from Birdside HTX. Plan pickup for teams, parties, and events."
);

export default function CateringRoutePage() {
  return (
    <PageShell
      mainSlots={[
        <main key="catering" className="main-wrapper">
          <CateringPage />
        </main>
      ]}
    />
  );
}
