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
            <strong>Last updated: July 19, 2026</strong>
          </p>
          <h2>1. Introduction</h2>
          <p>
            At Birdside HTX (&quot;Birdside,&quot; &quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;), we respect your privacy. This Privacy Policy explains
            how we collect, use, share, and protect information when you visit
            our website, place an order, contact us, join a marketing list,
            request catering, or otherwise interact with our services.
          </p>
          <h2>2. Information we collect</h2>
          <p>
            We may collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Name, email address, phone number, and contact details.</li>
            <li>Order details, payment status, pickup, delivery, or catering information.</li>
            <li>Messages, requests, survey responses, or feedback you send to us.</li>
            <li>Marketing preferences, text message opt-ins, and consent records.</li>
          </ul>
          <p>
            We may also collect technical and usage information, such as IP
            address, browser type, device information, pages viewed, referring
            pages, and interactions with our website through cookies and similar
            technologies.
          </p>
          <h2>3. How we use your information</h2>
          <p>
            We use information to:
          </p>
          <ul>
            <li>Process orders, payments, pickup, delivery, and catering requests.</li>
            <li>Communicate with you and provide customer support.</li>
            <li>Improve our website, menu, services, and guest experience.</li>
            <li>Prevent fraud, misuse, or security issues.</li>
            <li>Send marketing messages where permitted by law and your consent.</li>
            <li>Comply with legal obligations, carrier requirements, and business records needs.</li>
          </ul>
          <h2>4. Text message marketing</h2>
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
          <h2>5. Abandoned cart text messages</h2>
          <p>
            Birdside HTX&apos;s website uses cookies and similar technologies to
            help keep track of items you put into your shopping cart, including
            when you have abandoned your cart. This information may be used to
            determine when to send cart reminder messages by text message if you
            have opted in to receive text messages from us.
          </p>
          <h2>6. Location information</h2>
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
          <h2>7. Third-party service providers and data sharing</h2>
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
          <h2>8. Cookies and similar technologies</h2>
          <p>
            We use cookies and similar technologies to operate our website,
            remember preferences, support ordering features, measure performance,
            understand website usage, and support marketing or cart reminder
            features where permitted.
          </p>
          <h2>9. Data security</h2>
          <p>
            We use reasonable administrative, technical, and physical safeguards
            designed to protect personal information. No website, ordering
            system, or transmission method is completely secure, so we cannot
            guarantee absolute security.
          </p>
          <h2>10. Your choices and rights</h2>
          <p>
            You may contact us to request access, correction, or deletion of
            personal information where required by applicable law. You can opt
            out of marketing text messages by replying STOP to a message from us
            or following the instructions in the message.
          </p>
          <h2>11. Contact</h2>
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
