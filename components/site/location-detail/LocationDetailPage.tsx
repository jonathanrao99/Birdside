import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL, ORDER_NOW_URL } from "@/lib/site-shell-data";
import styles from "./location-detail-page.module.css";

const HOURS = [
  "Monday 5 PM-12:30 AM",
  "Tuesday 5 PM-12:30 AM",
  "Wednesday 5 PM-12:30 AM",
  "Thursday 5 PM-12:30 AM",
  "Friday 5 PM-12:30 AM",
  "Saturday 5 PM-12:30 AM",
  "Sunday 5 PM-12:30 AM"
] as const;

const MAIN_IMAGE_SRC = "/assets/home/location-hero-118.jpg";

export default function LocationDetailPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="location-heading">
        <div className={styles.mediaPanel}>
          <Image
            src={MAIN_IMAGE_SRC}
            alt="Birdside HTX food truck and outdoor Katy pickup location."
            fill
            priority
            sizes="(max-width: 899px) 100vw, 48vw"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.copyPanel}>
          <p className={styles.kicker}>Birdside HTX location</p>
          <h1 id="location-heading" className={styles.title}>
            Katy, TX
            <span className={styles.titleAccent}>pull up hungry.</span>
          </h1>
          <p className={styles.lede}>
            Home base on North Fry Road serving crispy wings, hot chicken sandos,
            loaded fries, mac, sauces, and late-night flavor for Katy and West
            Houston.
          </p>

          <div className={styles.infoStack}>
            <a className={styles.infoItem} href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
              <span className={styles.infoIcon} aria-hidden="true">●</span>
              <span>1989 N Fry Rd, Katy, TX 77449</span>
            </a>
            <a className={styles.infoItem} href="tel:+18328738528">
              <span className={styles.infoIcon} aria-hidden="true">●</span>
              <span>(832) 873-8528</span>
            </a>
          </div>

          <div className={styles.ctaRow}>
            <a className={styles.btnPrimary} href={ORDER_NOW_URL} target="_blank" rel="noopener noreferrer">
              Get your fix
            </a>
            <a className={styles.btnGhost} href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
              View on maps
            </a>
          </div>
        </div>
      </section>

      <section className={styles.details} aria-labelledby="details-heading">
        <div>
          <p className={styles.kicker}>Open nightly</p>
          <h2 id="details-heading" className={styles.sectionTitle}>
            Late-night chicken, seven days a week.
          </h2>
          <p className={styles.prose}>
            Swing by for pickup, order ahead through Square, or build a catering
            run for the crew. Everything starts at the Katy kitchen and leaves
            with sauce, crunch, and heat intact.
          </p>
        </div>

        <div className={styles.hoursCard}>
          <h3 className={styles.cardTitle}>Hours</h3>
          <ul className={styles.hoursList}>
            {HOURS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.bottomBand} aria-labelledby="next-heading">
        <div>
          <p className={styles.kicker}>Before you roll through</p>
          <h2 id="next-heading" className={styles.bottomTitle}>
            Check the menu, pick your heat, then pull up.
          </h2>
        </div>
        <div className={styles.ctaRow}>
          <Link className={styles.btnDark} href="/menu">
            View menu
          </Link>
          <Link className={styles.btnGhostDark} href="/catering">
            Catering
          </Link>
        </div>
      </section>
    </main>
  );
}
