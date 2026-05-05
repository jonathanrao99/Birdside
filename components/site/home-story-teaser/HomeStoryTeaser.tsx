import Link from "next/link";
import styles from "./home-story-teaser.module.css";

/**
 * “About us” bridge between the home food carousel and testimonials (CMS).
 */
export default function HomeStoryTeaser() {
  return (
    <section
      className={styles.section}
      aria-labelledby="home-story-teaser-heading"
    >
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.kicker}>Why Birdside</p>
        <h2 id="home-story-teaser-heading" className={styles.title}>
          Built for the late-night{" "}
          <span className={styles.titleAccent}>crave</span>
        </h2>
        <div className={styles.copy}>
          <p className={styles.lead}>
            Hot chicken and sides in Katy: bold flavor, open late, zero fluff.
            We built Birdside for the nights when only something crispy, spicy,
            and a little reckless hits the spot.
          </p>
          <p className={styles.body}>
            You get a tight menu on purpose. Fewer items means every sando,
            tender, and wing gets the same care from the fryer to the pass.
            Pull up when you are hungry, stay when the playlist feels right.
          </p>
          <p className={styles.body}>
            Sauces and dips are part of the story, not an afterthought. From
            house ranch to the lab favorites, we keep flavor loud and familiar
            enough to share with friends who swear they will only try one bite.
          </p>
          <ul className={styles.highlights} aria-label="What to expect">
            <li className={styles.highlight}>
              <span className={styles.highlightTitle}>Late nights</span>
              <span className={styles.highlightText}>
                Open seven nights, 5PM–12:30AM, because cravings do not clock
                out early.
              </span>
            </li>
            <li className={styles.highlight}>
              <span className={styles.highlightTitle}>Katy roots</span>
              <span className={styles.highlightText}>
                Houston energy with a neighborhood counter: fast handoffs,
                real heat, no fuss.
              </span>
            </li>
            <li className={styles.highlight}>
              <span className={styles.highlightTitle}>Built to share</span>
              <span className={styles.highlightText}>
                Trays for the table, catering for the crew, and a menu you can
                scan in seconds.
              </span>
            </li>
          </ul>
          <p className={styles.support}>
            Want the deep cut on how we started, what we stand for, and where we
            are headed next?{" "}
            <Link href="/sauce-lab" className={styles.inlineLink}>
              Sauce Lab
            </Link>
            ,{" "}
            <Link href="/menu" className={styles.inlineLink}>
              menu
            </Link>
            , and{" "}
            <Link href="/catering" className={styles.inlineLink}>
              catering
            </Link>{" "}
            are all a tap away while you read.
          </p>
        </div>
        <Link href="/about" className={styles.cta}>
          Read our story
        </Link>
      </div>
    </section>
  );
}
