import PageShell from "@/components/site/PageShell";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/page-metadata";

export const metadata: Metadata = {
  title: `Sauce Lab | ${SITE_NAME}`,
  description: "House-made sauces at Birdside HTX, Katy, TX."
};

export default function SauceLabPage() {
  return (
    <PageShell
      mainSlots={[
        `<main class="main-wrapper"><section class="padding-global padding-section-medium"><div class="container-small"><h1 class="heading-style-h2">Sauce Lab</h1><p class="text-size-medium">Details on our house-made sauces coming soon.</p></div></section></main>`
      ]}
    />
  );
}
