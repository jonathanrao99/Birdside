import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Privacy Policy",
    description:
      "Privacy policy for Peckers Chicken. Learn how we collect, use and safeguard your personal information when you order or visit our website.",
    keywords: [
      "Peckers privacy policy",
      "data protection",
      "GDPR Peckers",
      "personal data",
      "cookies policy",
      "Peckers Chicken Ltd",
    ],
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-peakers text-5xl md:text-7xl mb-12 tracking-tight uppercase">Privacy Policy</h1>
        
        <div className="space-y-12 text-white/80 leading-relaxed font-sans text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">1. Introduction</h2>
            <p>
              At Peckers Chicken Ltd ("we", "our", or "us"), we are committed to protecting and respecting your privacy. 
              This policy explains how we collect, use, and safeguard your personal information when you visit our website 
              or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">2. Information We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Information you provide when ordering (name, email, phone, delivery address).</li>
              <li>Details of transactions you carry out through our site.</li>
              <li>Technical data including IP address, browser type, and usage patterns via cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. How We Use Your Data</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Process and deliver your food orders.</li>
              <li>Improve our website and customer service.</li>
              <li>Send you promotional offers if you have opted in to receive them.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. 
              All sensitive transaction data is processed through secure, encrypted gateways.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">5. Your Rights</h2>
            <p>
              Under the GDPR, you have the right to access, rectify, or erase your personal data. 
              To exercise these rights, please contact us at <span className="text-white font-mono underline decoration-[#C41718]">hello@peckers.co.uk</span>.
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
