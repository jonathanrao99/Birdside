import HomeAboutCarousel, { type HomeAboutSlide } from "./HomeAboutCarousel";
import styles from "./home-about.module.css";

const SLIDES: HomeAboutSlide[] = [
  {
    id: "reel-1",
    type: "video",
    src: "/assets/home/reels/reel-1.mp4",
    poster: "/assets/home/reels/reel-1-poster.jpg",
    alt: "Birdside reel showing a stacked chicken sandwich.",
    caption: "Stacked sandos. Built fresh, served hot."
  },
  {
    id: "sando",
    type: "image",
    src: "/assets/home/about-sando.jpg",
    alt: "Stacked fried chicken sandwich held toward the camera.",
    caption: "Stacked sandos. Built fresh, served hot."
  },
  {
    id: "reel-2",
    type: "video",
    src: "/assets/home/reels/reel-2.mp4",
    poster: "/assets/home/reels/reel-2-poster.jpg",
    alt: "Birdside reel showing sauced wings and ranch.",
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
    id: "reel-3",
    type: "video",
    src: "/assets/home/reels/reel-3.mp4",
    poster: "/assets/home/reels/reel-3-poster.jpg",
    alt: "Birdside reel showing glazed chicken wings.",
    caption: "Glazed wings, made to share."
  },
  {
    id: "hero-tray",
    type: "image",
    src: "/assets/home/hero-wings-tray.jpg",
    alt: "Tray of crispy Birdside wings ready to serve.",
    caption: "Fresh out the fryer, full of flavor."
  }
];

const INITIAL_SLIDE_INDEX = 0;

export default function HomeAbout() {
  return (
    <section className="section_home-about">
      <div className={styles.sectionInner}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>
              <span className={styles.titleEmphasis}>Fresh</span>
              {" OUT THE FRYER,"}
            </span>
            <span className={styles.titleLine}>
              {"FULL OF "}
              <span className={styles.titleEmphasis}>Flavor</span>
            </span>
          </h2>
        </header>

        <HomeAboutCarousel slides={SLIDES} initialIndex={INITIAL_SLIDE_INDEX} />
      </div>
    </section>
  );
}
