import Link from "next/link";
import {
  ORDER_NOW_URL,
  GOOGLE_MAPS_URL
} from "@/lib/site-shell-data";
import styles from "./about-story-page.module.css";

export default function AboutStoryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Birdside HTX · Katy</p>
          <h1 id="about-heading" className={styles.title}>
            Our Story
            <span className={styles.titleAccent}>Late-night chicken</span>
          </h1>
          <p className={styles.lede}>
            Birdside is Houston-area hot chicken built for the stretch between
            dinner rush and last call—consistency on the line, halal in the
            kitchen, and sauces mixed in-house because dip shouldn&apos;t taste
            like an afterthought.
          </p>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={`${styles.sectionInner} ${styles.twoCol}`}>
          <div>
            <h2 id="why-heading" className={styles.sectionTitle}>
              Why we&apos;re here
            </h2>
            <p className={styles.prose}>
              Katy didn&apos;t need another giant menu—it needed a crew that could
              hold crunch and heat when the tickets stack up. We keep the lineup
              tight so sandwiches, tenders, and wings get the same pass through
              the fryer and finish table every night.
            </p>
          </div>
          <div>
            <h3 className={styles.subHeading}>How we operate</h3>
            <p className={styles.prose}>
              Seven nights a week,{" "}
              <strong>5:00 PM – 12:30 AM</strong>
              —walk in, grab pickup from Square, or plan trays through{" "}
              <Link href="/catering" className={styles.inlineLink}>
                catering
              </Link>
              . Questions hit{" "}
              <Link href="/contact" className={styles.inlineLink}>
                contact
              </Link>
              ; favorites live on the{" "}
              <Link href="/menu" className={styles.inlineLink}>
                menu
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="pillars-heading">
        <div className={styles.sectionInner}>
          <h2 id="pillars-heading" className={styles.sectionTitle}>
            Non-negotiables
          </h2>
          <div className={styles.grid}>
            <div className={styles.pillar}>
              <h3 className={styles.pillarTitle}>Texture first</h3>
              <p className={styles.pillarBody}>
                Busy nights aren&apos;t an excuse for soggy breading—we fry and
                finish like people are watching (they are).
              </p>
            </div>
            <div className={styles.pillar}>
              <h3 className={styles.pillarTitle}>Sauce Lab</h3>
              <p className={styles.pillarBody}>
                House dips and sauces are part of the meal—not bottled filler.
                Explore them on{" "}
                <Link href="/sauce-lab" className={styles.inlineLink}>
                  Sauce Lab
                </Link>
                .
              </p>
            </div>
            <div className={styles.pillar}>
              <h3 className={styles.pillarTitle}>Room for crews</h3>
              <p className={styles.pillarBody}>
                Offices and parties run trays through Katy pickup—start at{" "}
                <Link href="/catering" className={styles.inlineLink}>
                  Catering
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.visitBand}`}
        aria-labelledby="visit-heading"
      >
        <div className={styles.visitInner}>
          <div>
            <h2 id="visit-heading" className={styles.sectionTitle}>
              Pull up
            </h2>
            <p className={styles.visitCopy}>Birdside HTX — Katy</p>
            <p className={styles.visitMeta}>
              Open nightly · Halal · Late-night hours — see{" "}
              <Link href="/faq" className={styles.inlineLink}>
                FAQ
              </Link>{" "}
              or{" "}
              <Link href="/locations/katy-tx" className={styles.inlineLink}>
                location details
              </Link>
              .
            </p>
          </div>
          <div className={styles.ctaRow}>
            <a
              href={ORDER_NOW_URL}
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order pickup
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              className={styles.btnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
