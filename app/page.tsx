import HomeHeader from "@/components/site/HomeHeader";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/");

export default function HomePage() {
  const content = getRouteContent("/");
  if (!content) notFound();
  return (
    <PageShell
      lead={<HomeHeader />}
      preMain={<PatternStrip tone="black" />}
      insertPreMainBefore={'<section class="section_home-about"'}
      mainHtml={content.mainHtml}
    />
  );
}
