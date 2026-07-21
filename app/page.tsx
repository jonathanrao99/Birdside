import HomeAbout from "@/components/site/home-about/HomeAbout";
import HomeBestSellers from "@/components/site/home-best-sellers/HomeBestSellers";
import HomeCtaLottiesDynamic from "@/components/site/HomeCtaLottiesDynamic";
import HomeHeader from "@/components/site/HomeHeader";
import HomeStoryTeaser from "@/components/site/home-story-teaser/HomeStoryTeaser";
import ElfsightSocialFeed from "@/components/site/elfsight-social-feed/ElfsightSocialFeed";
import PageShell from "@/components/site/PageShell";
import PatternStrip from "@/components/site/PatternStrip";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import {
  MENU_PAGE_LEAD_SECTION_PREFIX,
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
  const testimonialsIdx = p3.indexOf(MENU_PAGE_LEAD_SECTION_PREFIX);
  const beforeTestimonials = testimonialsIdx >= 0 ? p3.slice(0, testimonialsIdx) : p3;
  const testimonialsAndRest = testimonialsIdx >= 0 ? p3.slice(testimonialsIdx) : "";
  return (
    <>
      <PageShell
        lead={<HomeHeader />}
        mainSlots={[
          <div key="home-main" className="main-wrapper">
            <div dangerouslySetInnerHTML={{ __html: p1 }} />
            <PatternStrip tone="black" />
            <HomeAbout />
            <HomeStoryTeaser />
            <div dangerouslySetInnerHTML={{ __html: beforeTestimonials }} />
            <HomeBestSellers />
            <ElfsightSocialFeed />
            <div dangerouslySetInnerHTML={{ __html: testimonialsAndRest }} />
          </div>
        ]}
      />
      <HomeCtaLottiesDynamic />
    </>
  );
}
