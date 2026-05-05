import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import SauceLabPageClient from "@/components/site/sauce-lab/SauceLabPageClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/page-metadata";

export const metadata: Metadata = {
  title: `Sauce Lab | ${SITE_NAME}`,
  description:
    "House-made sauces and dips at Birdside HTX — full-screen sauce lab with nutrition notes and fresh daily prep."
};

export default function SauceLabPage() {
  return (
    <PageShell
      mainSlots={[
        <div className="sauce-lab-viewport-fill" key="sauce-lab-screen">
          <main className="main-wrapper sauce-lab-route">
            <SauceLabPageClient />
          </main>
        </div>,
        <PatternStrip key="sauce-lab-pattern" tone="black" />,
        <OurMenu key="sauce-lab-menu" />
      ]}
    />
  );
}
