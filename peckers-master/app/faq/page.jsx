import React from "react";
import FaqClient from "./FaqClient";
import { faqData } from "./faqData";
import { buildPageMetadata } from "../lib/seo";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema, faqSchema } from "../lib/structured-data";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Peckers FAQ | Questions About Our Chicken & Menu",
    description:
      "Got questions about Peckers? Find out about our chicken, opening hours, locations in Stevenage and Hitchin, delivery, menu, and loyalty rewards.",
    keywords: [
      "Peckers FAQ",
      "is Peckers good",
      "what does Peckers serve",
      "Peckers opening hours Stevenage",
      "Peckers opening hours Hitchin",
      "where is Peckers",
      "does Peckers do delivery",
      "best chicken shop Hertfordshire",
      "Peckers loyalty program",
      "Peckers chicken menu",
      "is Peckers chicken fresh",
      "Peckers peri peri",
    ],
    path: "/faq",
  });
}

const FAQPage = () => {
  const faqItems = faqData.flatMap((category) =>
    category.items.map((item) => ({
      question: item.question,
      answer: item.answer.replace(/\[(.*?)\]\((.*?)\)/g, "$1"),
    })),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(faqItems),
        ]}
      />

      <main className="min-h-screen bg-black text-white pt-[25vw] md:pt-[15vw] lg:pt-[10vw] pb-[2vw]">
        <FaqClient />
      </main>
    </>
  );
};

export default FAQPage;
