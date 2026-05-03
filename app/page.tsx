import HomeCtaLottiesDynamic from "@/components/site/HomeCtaLottiesDynamic";
import HomeHeader from "@/components/site/HomeHeader";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import {
  splitHomeMainAroundOurMenu,
  stripHomeMarqueeSection
} from "@/lib/split-page-html";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/");

export default function HomePage() {
  const content = getRouteContent("/");
  if (!content) notFound();
  const { part1, part2, part3 } = splitHomeMainAroundOurMenu(content.mainHtml);
  const p1 = stripHomeMarqueeSection(part1);
  const p2 = stripHomeMarqueeSection(part2);
  const p3 = stripHomeMarqueeSection(part3);
  return (
    <>
      <PageShell
        lead={<HomeHeader />}
        mainSlots={[
          <main key="home-main" className="main-wrapper">
            <div dangerouslySetInnerHTML={{ __html: p1 }} />
            <PatternStrip tone="black" />
            <div dangerouslySetInnerHTML={{ __html: p2 }} />
            <OurMenu />
            <div dangerouslySetInnerHTML={{ __html: p3 }} />
          </main>
        ]}
      />
      <HomeCtaLottiesDynamic />
    </>
  );
}
