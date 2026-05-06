import Link from "next/link";
import HomeStoryMarquee from "./HomeStoryMarquee";
import styles from "./home-story-teaser.module.css";

/**
 * Home bridge — scrolling marquee + centered headline + pillars (Birdside black / red / white).
 */
export default function HomeStoryTeaser() {
  return (
    <section className={styles.section} aria-labelledby="home-story-teaser-heading">
      <HomeStoryMarquee />

      <div className={styles.inner}>
        <div className={styles.top}>
          <h2 id="home-story-teaser-heading" className={styles.headline}>
            Late-night chicken,
            <br />
            <span className={styles.headlineAccent}>done right.</span>
          </h2>
        </div>

        <ul className={styles.pillars} aria-label="Hours, menu, groups">
          <li className={styles.pillar}>
            <span className={styles.pillarKicker}>Hours</span>
            <h3 className={styles.pillarTitle}>Seven nights straight</h3>
            <p className={styles.pillarBody}>
              <span className={styles.pillarTime}>5:00 PM – 12:30 AM</span>, every
              night. Eat in or run it out the door.
            </p>
          </li>
          <li className={styles.pillar}>
            <span className={styles.pillarKicker}>Menu</span>
            <h3 className={styles.pillarTitle}>Busy line, same standard</h3>
            <p className={styles.pillarBody}>
              <Link href="/menu" className={styles.inlineLink}>
                What we run
              </Link>{" "}
              <span className={styles.pillarBodyAccent}>is tight for a reason</span>ß. Even at full volume, it stays crispy.
            </p>
          </li>
          <li className={styles.pillar}>
            <span className={styles.pillarKicker}>Groups</span>
            <h3 className={styles.pillarTitle}>Tray math</h3>
            <p className={styles.pillarBody}>
              <Link href="/catering" className={styles.inlineLink}>
                Catering
              </Link>{" "}
              for offices, parties, whatever needs wings and sides in bulk.
            </p>
          </li>
        </ul>

        <div className={styles.ctaRow}>
          <p className={styles.ctaSupport}>
            <span className={styles.ctaLinks}>
              <Link href="/menu" className={styles.inlineLink}>
                Menu
              </Link>
              <span className={styles.ctaSep} aria-hidden>
                ·
              </span>
              <Link href="/sauce-lab" className={styles.inlineLink}>
                Sauce Lab
              </Link>
              <span className={styles.ctaSep} aria-hidden>
                ·
              </span>
              <Link href="/catering" className={styles.inlineLink}>
                Catering
              </Link>
            </span>{" "}
            <span className={styles.ctaTail}>
               &nbsp;the orders people run back for.
            </span>
          </p>
          <Link href="/about" className={styles.ctaBtn}>
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}
