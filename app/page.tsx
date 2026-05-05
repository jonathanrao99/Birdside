import HomeAbout from "@/components/site/home-about/HomeAbout";
import HomeCtaLottiesDynamic from "@/components/site/HomeCtaLottiesDynamic";
import HomeHeader from "@/components/site/HomeHeader";
import HomeStoryTeaser from "@/components/site/home-story-teaser/HomeStoryTeaser";
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
  const { part1, part3 } = splitHomeMainAroundOurMenu(content.mainHtml);
  const p1 = stripHomeMarqueeSection(part1);
  const p3 = stripHomeMarqueeSection(part3);
  return (
    <>
      <PageShell
        lead={<HomeHeader />}
        mainSlots={[
          <main key="home-main" className="main-wrapper">
            <div dangerouslySetInnerHTML={{ __html: p1 }} />
            <PatternStrip tone="black" />
            <HomeAbout />
            <HomeStoryTeaser />
            <div dangerouslySetInnerHTML={{ __html: p3 }} />
          </main>
        ]}
      />
      <HomeCtaLottiesDynamic />
    </>
  );
}
