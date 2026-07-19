import PlaceholderDoc from "@/components/site/placeholder-doc/PlaceholderDoc";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/terms",
  "Mobile terms of service for Birdside HTX SMS and text messaging."
);

export default function TermsPage() {
  return (
    <PageShell
      mainSlots={[
        <PlaceholderDoc key="terms" title="Terms of service">
          <h2>Mobile Terms of Service</h2>
          <p>Birdside HTX</p>
          <p>Last updated: July 19, 2026</p>
          <p>
            The Birdside HTX mobile message service (the &quot;Service&quot;) is
            operated by Birdside HTX (&quot;Birdside HTX&quot;, &quot;we&quot;, or
            &quot;us&quot;). Your use of the Service constitutes your agreement to
            these terms and conditions (&quot;Mobile Terms&quot;). We may modify or
            cancel the Service or any of its features without notice. To the
            extent permitted by applicable law, we may also modify these Mobile
            Terms at any time and your continued use of the Service following
            the effective date of any such changes shall constitute your
            acceptance of such changes.
          </p>
          <p>
            By consenting to Birdside HTX&apos;s SMS/text messaging service, you
            agree to receive recurring SMS/text messages from and on behalf of
            Birdside HTX through your wireless provider to the mobile number you
            provided, even if your mobile number is registered on any state or
            federal Do Not Call list. Text messages may be sent using an
            automatic telephone dialing system or other technology. Promotional
            messages may include promotions, specials, and other marketing
            offers, including cart reminders.
          </p>
          <p>
            For questions about these Mobile Terms, reach us at{" "}
            <a href="mailto:birdsidehtx@gmail.com?subject=Terms">
              birdsidehtx@gmail.com
            </a>
            .
          </p>
        </PlaceholderDoc>
      ]}
    />
  );
}
