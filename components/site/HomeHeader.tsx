import HomeHeroVideo, { HomeHeroVideoBackdrop } from "@/components/site/HomeHeroVideo";

export default function HomeHeader() {
  return (
    <section className="section_home-header">
      <HomeHeroVideoBackdrop />
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
