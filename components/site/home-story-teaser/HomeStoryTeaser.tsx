import Link from "next/link";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
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

        <ul className={styles.factList} aria-label="Birdside details">
          <li className={styles.factItem}>
            <span className={styles.factNumber}>01</span>
            <span className={styles.factText}>Fresh chicken cooked to order.</span>
          </li>
          <li className={styles.factItem}>
            <span className={styles.factNumber}>02</span>
            <span className={styles.factText}>100% Halal menu.</span>
          </li>
          <li className={styles.factItem}>
            <span className={styles.factNumber}>03</span>
            <span className={styles.factText}>Catering trays for groups.</span>
          </li>
          <li className={styles.factItem}>
            <span className={styles.factNumber}>04</span>
            <span className={styles.factText}>Pull up in Katy.</span>
          </li>
        </ul>

        <div className={styles.ctaRow}>
          <Link href="/menu" className={styles.ctaBtnPrimary}>
            View menu
          </Link>
          <a href={ORDER_NOW_URL} className={styles.ctaBtn}>
            Order now
          </a>
          <Link href="/catering" className={styles.inlineLink}>
            Catering
          </Link>
        </div>
      </div>
    </section>
  );
}
