import HomeCtaLotties from "@/components/site/HomeCtaLotties";
import HomeHeader from "@/components/site/HomeHeader";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import { splitHomeMainAroundOurMenu } from "@/lib/split-page-html";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/");

export default function HomePage() {
  const content = getRouteContent("/");
  if (!content) notFound();
  const { part1, part2, part3 } = splitHomeMainAroundOurMenu(content.mainHtml);
  return (
    <>
      <PageShell
        lead={<HomeHeader />}
        mainSlots={[
          <main key="home-main" className="main-wrapper">
            <div dangerouslySetInnerHTML={{ __html: part1 }} />
            <PatternStrip tone="black" />
            <div dangerouslySetInnerHTML={{ __html: part2 }} />
            <OurMenu />
            <div dangerouslySetInnerHTML={{ __html: part3 }} />
          </main>
        ]}
      />
      <HomeCtaLotties />
    </>
  );
}
