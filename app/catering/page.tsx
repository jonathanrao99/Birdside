import PageShell from "@/components/site/PageShell";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/page-metadata";

export const metadata: Metadata = {
  title: `Catering | ${SITE_NAME}`,
  description: "Catering from Birdside HTX, Katy, TX."
};

export default function CateringPage() {
  return (
    <PageShell
      mainSlots={[
        `<main class="main-wrapper"><section class="padding-global padding-section-medium"><div class="container-small"><h1 class="heading-style-h2">Catering</h1><p class="text-size-medium">Catering information coming soon.</p></div></section></main>`
      ]}
    />
  );
}
