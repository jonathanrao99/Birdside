import PageShell from "@/components/site/PageShell";
import SauceLabPageClient from "@/components/site/sauce-lab/SauceLabPageClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/page-metadata";

export const metadata: Metadata = {
  title: `Sauce Lab | ${SITE_NAME}`,
  description:
    "House-made sauces and dips at Birdside HTX — full-screen sauce lab experience."
};

export default function SauceLabPage() {
  return (
    <PageShell
      mainSlots={[
        <div className="sauce-lab-viewport-fill" key="sauce-lab-screen">
          <main className="main-wrapper sauce-lab-route">
            <SauceLabPageClient />
          </main>
        </div>
      ]}
    />
  );
}
