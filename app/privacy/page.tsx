import PlaceholderDoc from "@/components/site/placeholder-doc/PlaceholderDoc";
import PageShell from "@/components/site/PageShell";
import { buildPlaceholderMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildPlaceholderMetadata(
  "/privacy",
  "Privacy policy for Birdside HTX, including online orders, SMS messaging, abandoned cart reminders, and data sharing."
);

export default function PrivacyPage() {
  return (
    <PageShell
      mainSlots={[
        <PlaceholderDoc key="privacy" title="Privacy policy">
          <p>
            Birdside HTX collects information you provide when you visit our
            website, place an order, contact us, join a marketing list, request
            catering, or otherwise interact with our services. This may include
            your name, email address, phone number, order details, delivery or
            pickup information, and messages you send to us.
          </p>
          <p>
            We use this information to process orders, communicate with you,
            provide customer support, improve our website and services, prevent
            fraud or misuse, and send marketing messages where permitted by law
            and your consent.
          </p>
          <h2>Text message marketing</h2>
          <p>
            If you provide your phone number and opt in to receive text messages
            from Birdside HTX, we may use your phone number to send order
            updates, promotional messages, cart reminders, and other marketing
            messages. Message frequency may vary. Message and data rates may
            apply. You can opt out of marketing text messages at any time by
            following the instructions included in the message, such as replying
            STOP.
          </p>
          <p>
            We use phone numbers and text message consent information only to
            operate our messaging program, send messages you requested or agreed
            to receive, maintain consent records, and comply with applicable
            laws and carrier requirements.
          </p>
          <h2>Abandoned cart text messages</h2>
          <p>
            Birdside HTX&apos;s website uses cookies and similar technologies to
            help keep track of items you put into your shopping cart, including
            when you have abandoned your cart. This information may be used to
            determine when to send cart reminder messages by text message if you
            have opted in to receive text messages from us.
          </p>
          <h2>Third-party service providers and data sharing</h2>
          <p>
            We may share information with service providers that help us operate
            our website, process payments and orders, provide analytics, deliver
            email or text messages, prevent fraud, or support our business
            operations. These service providers are allowed to use information
            only as needed to provide services to us.
          </p>
          <p>
            The above excludes text messaging originator opt-in data and
            consent; this information will not be shared with any third parties
            for their own marketing purposes.
          </p>
          <h2>Location information</h2>
          <p>
            We may use location-related information that you provide, such as a
            delivery address, pickup location, or city suggestion, to fulfill
            orders, show relevant restaurant or service information, improve our
            location planning, and respond to requests. If our website or a
            third-party ordering or mapping tool requests precise device
            location, that location is collected only with your browser or
            device permission and is used to provide the location-based feature
            you requested.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this privacy policy? Email{" "}
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
