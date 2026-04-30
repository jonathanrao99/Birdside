import HomeHeroCarousel from "@/components/site/HomeHeroCarousel";

export default function HomeHeader() {
  return (
    <section className="section_home-header">
      <div className="padding-section-xsmall"></div>
      <div className="padding-global">
        <div className="home-header_component">
          <HomeHeroCarousel />
        </div>
      </div>
      <div className="padding-section-small"></div>
    </section>
  );
}
