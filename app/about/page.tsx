import AboutStoryPage from "@/components/site/about/AboutStoryPage";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/about",
  "Our story: Birdside HTX in Katy — late-night halal hot chicken, house-made sauces, tight menu execution, and catering for crews."
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
