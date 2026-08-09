import AboutStoryPage from "@/components/site/about/AboutStoryPage";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/about",
  "Our story: Birdside HTX is a family-owned Katy food truck serving 100% halal hot chicken, cooked fresh to order since 2023."
);

export default function AboutRoutePage() {
  return (
    <PageShell
      mainSlots={[
        <main key="about" className="main-wrapper">
          <AboutStoryPage />
        </main>
      ]}
    />
  );
}
