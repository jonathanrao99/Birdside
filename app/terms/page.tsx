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
          <section>
            <h2>1. Acceptance of terms</h2>
            <p>
              By accessing or using our website, placing an order, visiting a
              Birdside HTX location, or using our mobile message service, you
              agree to these Terms of Service. If you do not agree, please do
              not use our services.
            </p>
          </section>
          <section>
            <h2>2. Orders and payment</h2>
            <p>
              When you place an order, you are making an offer to purchase food,
              drinks, merchandise, catering, or related services from Birdside
              HTX. We reserve the right to decline, cancel, or limit any order
              for any reason, including product availability, suspected fraud,
              pricing or menu errors, or operational constraints. Payment must be
              made through accepted payment methods at the time required by the
              ordering channel.
            </p>
          </section>
          <section>
            <h2>3. Pickup, delivery, and catering</h2>
            <p>
              Pickup, delivery, and catering times are estimates and are not
              guaranteed. Please arrive during your designated pickup window when
              possible so your food is served fresh. Delivery may be provided by
              Birdside HTX or third-party delivery providers, and additional
              terms from those providers may apply.
            </p>
          </section>
          <section>
            <h2>4. Cancellations and refunds</h2>
            <p>
              Because our food is prepared fresh, cancellations may not be
              possible once preparation has started. If there is an issue with
              your order, contact us as soon as possible. Refunds, credits,
              replacements, or other remedies are handled at the discretion of
              Birdside HTX or the applicable ordering or delivery provider.
            </p>
          </section>
          <section>
            <h2>5. Allergen liability</h2>
            <p>
              We take allergen and dietary requests seriously, but our food may
              be prepared in kitchens where common allergens are present and
              cross-contact can occur. Please review available allergen
              information and tell our team about allergies before placing an
              order.
            </p>
          </section>
          <section>
            <h2>6. Website use</h2>
            <p>
              You agree not to misuse our website, interfere with its operation,
              attempt unauthorized access, scrape content in a way that affects
              service availability, or use our services for unlawful purposes.
              Website content, branding, photos, graphics, and menu descriptions
              are owned by or licensed to Birdside HTX unless otherwise stated.
            </p>
          </section>
          <section>
            <h2>7. Mobile terms of service</h2>
            <p>
              The Birdside HTX mobile message service (the &quot;Service&quot;) is
              operated by Birdside HTX (&quot;Birdside HTX,&quot; &quot;we,&quot; or
              &quot;us&quot;). Your use of the Service constitutes your agreement to
              these mobile terms. We may modify or cancel the Service or any of
              its features without notice. To the extent permitted by applicable
              law, we may also modify these mobile terms at any time, and your
              continued use of the Service following the effective date of any
              such changes shall constitute your acceptance of such changes.
            </p>
            <p>
              By consenting to Birdside HTX&apos;s SMS/text messaging service, you
              agree to receive recurring SMS/text messages from and on behalf of
              Birdside HTX through your wireless provider to the mobile number
              you provided, even if your mobile number is registered on any state
              or federal Do Not Call list. Text messages may be sent using an
              automatic telephone dialing system or other technology.
              Promotional messages may include promotions, specials, and other
              marketing offers, including cart reminders.
            </p>
            <p>
              Message frequency may vary. Message and data rates may apply. You
              can opt out of marketing text messages at any time by following
              the instructions included in the message, such as replying STOP.
            </p>
          </section>
          <section>
            <h2>8. Changes to these terms</h2>
            <p>
              We may update these Terms of Service from time to time. The
              updated version will be posted on this page with the latest
              updated date, and continued use of our services after changes are
              posted means you accept the updated terms.
            </p>
          </section>
          <section>
            <h2>9. Contact</h2>
            <p>
              For questions about these Terms of Service, reach us at{" "}
              <a href="mailto:birdsidehtx@gmail.com?subject=Terms">
                birdsidehtx@gmail.com
              </a>
              .
            </p>
          </section>
          <section>
            <p>
              Last updated: July 19, 2026
              <br />
              Birdside HTX, Houston, Texas
            </p>
          </section>
        </PlaceholderDoc>
      ]}
    />
  );
}
