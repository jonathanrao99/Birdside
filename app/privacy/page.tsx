import PlaceholderDoc from "@/components/site/placeholder-doc/PlaceholderDoc";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/privacy",
  "Privacy policy for Birdside HTX. Full policy text is coming soon."
);

export default function PrivacyPage() {
  return (
    <PageShell
      mainSlots={[
        <PlaceholderDoc key="privacy" title="Privacy policy">
          <p>
            This placeholder page will soon include how we collect, use, and
            protect your information when you use our website and services.
          </p>
          <p>
            Questions in the meantime? Email{" "}
            <a href="mailto:birdsidehtx@gmail.com?subject=Privacy">
              birdsidehtx@gmail.com
            </a>
            .
          </p>
        </PlaceholderDoc>
      ]}
    />
  );
}
