import HomeAboutCarousel, { type HomeAboutSlide } from "./HomeAboutCarousel";
import styles from "./home-about.module.css";

const SLIDES: HomeAboutSlide[] = [
  {
    id: "sando",
    type: "image",
    src: "/assets/home/about-sando.jpg",
    alt: "Stacked fried chicken sandwich held toward the camera.",
    caption: "Stacked sandos. Built fresh, served hot."
  },
  {
    id: "hero-tray",
    type: "image",
    src: "/assets/home/hero-wings-tray.jpg",
    alt: "Tray of crispy Birdside wings ready to serve.",
    caption: "Fresh out the fryer, full of flavor."
  },
  {
    id: "wings",
    type: "image",
    src: "/assets/home/about-wings.jpg",
    alt: "Glazed chicken wings with sesame and scallions in a metal tray.",
    caption: "Glazed wings, made to share."
  },
  {
    id: "spread-cards",
    type: "image",
    src: "/assets/home/about-home-cards.jpg",
    alt: "Birdside menu favorites and sides in a flat-lay spread.",
    caption: "Late-night Houston favorite."
  },
  {
    id: "composite",
    type: "image",
    src: "/assets/home/about-section-composite.jpg",
    alt: "Birdside food spread and in-kitchen moment.",
    caption: "From the line to your table."
  }
];

const INITIAL_SLIDE_INDEX = 1;

export default function HomeAbout() {
  return (
    <section className="section_home-about">
      <div className={styles.sectionInner}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleEmphasis}>Fresh</span>
            {" OUT THE FRYER, FULL OF "}
            <span className={styles.titleEmphasis}>Flavor</span>
          </h2>
        </header>

        <HomeAboutCarousel slides={SLIDES} initialIndex={INITIAL_SLIDE_INDEX} />
      </div>
    </section>
  );
}
