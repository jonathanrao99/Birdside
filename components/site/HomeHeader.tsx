import HomeHeroVideo, { HomeHeroVideoBackdrop } from "@/components/site/HomeHeroVideo";
import { getHomeHeroVideoUrls } from "@/lib/home-hero-video-urls";

export default function HomeHeader() {
  const { desktopSrc, mobileSrc } = getHomeHeroVideoUrls();
  return (
    <section className="section_home-header">
      <HomeHeroVideoBackdrop desktopSrc={desktopSrc} mobileSrc={mobileSrc} />
      <div className="padding-section-xsmall"></div>
      <div className="padding-global">
        <div className="home-header_component">
          <HomeHeroVideo />
        </div>
      </div>
      <div className="padding-section-small"></div>
    </section>
  );
}
