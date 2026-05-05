import PlaceholderDoc from "@/components/site/placeholder-doc/PlaceholderDoc";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/faq",
  "Answers to common questions about Birdside HTX — menu, hours, ordering, and more. Full FAQ content coming soon."
);

export default function FaqPage() {
  return (
    <PageShell
      mainSlots={[
        <PlaceholderDoc key="faq" title="FAQ" headingId="faq">
          <p>
            We&apos;re putting the finishing touches on this page. Check back
            soon for answers about ordering, menu options, dietary questions, and
            visiting Birdside in Katy.
          </p>
          <p>
            Need something right away? <Link href="/contact">Contact us</Link>{" "}
            and
            we&apos;ll help.
          </p>
        </PlaceholderDoc>
      ]}
    />
  );
}
