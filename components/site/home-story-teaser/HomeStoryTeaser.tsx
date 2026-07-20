import HomeStoryMarquee from "./HomeStoryMarquee";
import styles from "./home-story-teaser.module.css";

/**
 * Home bridge — scrolling marquee + late-night restaurant details.
 */
export default function HomeStoryTeaser() {
  return (
    <section className={styles.section} aria-labelledby="home-story-teaser-heading">
      <HomeStoryMarquee />

      <div className={styles.inner}>
        <div className={styles.heroRow}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Katy, Texas · 100% Halal</p>
            <h2 id="home-story-teaser-heading" className={styles.headline}>
              Late-night chicken
              <br />
              <span className={styles.headlineAccent}>made to order.</span>
            </h2>
            <p className={styles.lede}>
              Fresh wings, sandos, and trays from 5 PM to 12:30 AM.
            </p>
          </div>

          <div className={styles.hoursBlock} aria-label="Birdside hours">
            <span className={styles.hoursLabel}>Open nightly</span>
            <strong className={styles.hoursTime}>5 PM–12:30 AM</strong>
            <span className={styles.hoursNote}>Katy dine-in, pickup, and late-night runs.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
