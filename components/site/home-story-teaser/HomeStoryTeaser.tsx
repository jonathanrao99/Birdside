import Link from "next/link";
import type { SVGProps } from "react";
import styles from "./home-story-teaser.module.css";

function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconMenuCard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </svg>
  );
}

function IconPeople(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

/**
 * About bridge between home carousel and testimonials — aligns with theme.md tokens & type scale.
 */
export default function HomeStoryTeaser() {
  return (
    <section
      className={styles.section}
      aria-labelledby="home-story-teaser-heading"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h2 id="home-story-teaser-heading" className={styles.title}>
              Late-night chicken,{" "}
              <span className={styles.titleAccent}>done right</span>
            </h2>
          </header>

          <div className={styles.copy}>
            <p className={styles.lead}>
              Crispy chicken, sides, and house-made sauces in Katy—open late so
              you can scratch the itch when most kitchens are closed.
            </p>
            <p className={styles.body}>
              We keep the menu short on purpose: every sandwich, tender, and wing
              gets the same attention from prep to pickup. Sauces and dips are
              made in-house—peek the lineup in{" "}
              <Link href="/sauce-lab" className={styles.inlineLink}>
                Sauce Lab
              </Link>
              .
            </p>

            <ul
              className={styles.highlights}
              aria-label="Hours, menu, and groups"
            >
              <li className={styles.highlight}>
                <span className={styles.highlightIconWrap}>
                  <IconClock className={styles.highlightIcon} />
                </span>
                <span className={styles.highlightTitle}>Hours</span>
                <span className={styles.highlightText}>
                  Open seven nights, 5:00 PM–12:30 AM. Dine in at our Katy
                  location or order ahead for pickup.
                </span>
              </li>
              <li className={styles.highlight}>
                <span className={styles.highlightIconWrap}>
                  <IconMenuCard className={styles.highlightIcon} />
                </span>
                <span className={styles.highlightTitle}>Menu</span>
                <span className={styles.highlightText}>
                  A focused lineup built for consistency—texture, heat, and
                  flavor stay balanced even when we&apos;re moving fast.
                </span>
              </li>
              <li className={styles.highlight}>
                <span className={styles.highlightIconWrap}>
                  <IconPeople className={styles.highlightIcon} />
                </span>
                <span className={styles.highlightTitle}>Groups</span>
                <span className={styles.highlightText}>
                  Catering for teams and get-togethers. Plan portions and
                  pickup on our{" "}
                  <Link href="/catering" className={styles.inlineLink}>
                    catering
                  </Link>{" "}
                  page.
                </span>
              </li>
            </ul>

            <p className={styles.support}>
              Dig into the full{" "}
              <Link href="/menu" className={styles.inlineLink}>
                menu
              </Link>
              , explore{" "}
              <Link href="/sauce-lab" className={styles.inlineLink}>
                Sauce Lab
              </Link>
              , or keep scrolling—guest favorites are up next.
            </p>
          </div>

          <div className={styles.ctaRow}>
            <Link href="/about" className={styles.cta}>
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
