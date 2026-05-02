import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Terms of Service",
    description:
      "Terms and conditions for using Peckers services - orders, payment, delivery, collection, cancellations, refunds and allergen liability for Stevenage and Hitchin.",
    keywords: [
      "Peckers terms of service",
      "terms and conditions",
      "Peckers ordering terms",
      "delivery terms Stevenage",
      "delivery terms Hitchin",
      "Peckers Chicken Ltd",
    ],
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-peakers text-5xl md:text-7xl mb-12 tracking-tight uppercase">Terms of Service</h1>
        
        <div className="space-y-12 text-white/80 leading-relaxed font-sans text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>
              By accessing and using our website or placing an order with Peckers, 
              you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">2. Orders & Payment</h2>
            <p>
              When you place an order, you are making an offer to purchase food and/or drink items. 
              We reserve the right to decline any order for any reason. 
              Payment must be made in full at the time of ordering via our accepted payment methods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. Delivery & Collection</h2>
            <p>
              We aim to deliver your order within the estimated timeframe provided. 
              However, delivery times are not guaranteed. For collections, please ensure you arrive 
              within your designated time slot to ensure your food is fresh and hot.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Cancellations & Refunds</h2>
            <p>
              As our food is prepared fresh to order, cancellations are generally not possible once preparation has started. 
              If there is an issue with your order, please contact the specific store immediately. 
              Refunds are issued at the discretion of the management.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">5. Allergen Liability</h2>
            <p>
              While we take great care to manage allergens in our kitchen, 
              cross-contamination can occur. Please refer to our Allergen Info page and 
              always inform our staff of any allergies before placing an order.
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <p className="text-sm font-mono opacity-60">
              Last updated: March 2024<br />
              Peckers Chicken Ltd, Hertfordshire, UK
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
