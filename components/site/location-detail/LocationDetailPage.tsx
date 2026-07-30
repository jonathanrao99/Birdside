import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL, ORDER_NOW_URL } from "@/lib/site-shell-data";
import styles from "./location-detail-page.module.css";

const HERO_IMAGE_SRC = "/assets/home/about-sando.jpg";
const TRUCK_IMAGE_SRC = "/assets/home/template-hero-bg.webp";
const PICKUP_IMAGE_SRC = "/assets/home/about-wings.jpg";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=1989%20N%20Fry%20Rd%2C%20Katy%2C%20TX%2077449&output=embed";

export default function LocationDetailPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.chapter} ${styles.hero}`} aria-labelledby="location-heading">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Birdside HTX · Katy</p>
          <h1 id="location-heading" className={styles.title}>
            North Fry Road
            <span>after dark.</span>
          </h1>
          <p className={styles.lede}>
            Katy nights. Birdside heat. No shortcuts.
          </p>
          <div className={styles.actions}>
            <div className="home-header_button-wrap">
              <a
                className="home-header_button w-inline-block"
                href={ORDER_NOW_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="home-header_button-text">Order now</div>
              </a>
            </div>
            <a
              className={styles.textLink}
              href={GOOGLE_MAPS_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get directions
            </a>
          </div>
        </div>

        <figure className={styles.mediaFrame}>
          <Image
            src={HERO_IMAGE_SRC}
            alt="Guest holding Birdside hot chicken in front of the Katy truck."
            width={858}
            height={960}
            priority
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), 620px"
            className={styles.image}
          />
        </figure>
      </section>

      <section className={`${styles.chapter} ${styles.chapterReverse} ${styles.truckChapter}`} aria-labelledby="truck-heading">
        <figure className={`${styles.mediaFrame} ${styles.wideFrame}`}>
          <Image
            src={TRUCK_IMAGE_SRC}
            alt="Birdside HTX black food truck at the Katy food park."
            width={1360}
            height={960}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), 680px"
            className={styles.image}
          />
        </figure>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>The truck</p>
          <h2 id="truck-heading" className={styles.sectionTitle}>
            Find the black truck.
          </h2>
          <p className={styles.lede}>
            1989 N Fry Rd. Open nightly. Follow the heat.
          </p>
        </div>
      </section>

      <section className={styles.chapter} aria-labelledby="pickup-heading">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Pickup window</p>
          <h2 id="pickup-heading" className={styles.sectionTitle}>
            Order ahead. Grab it hot.
          </h2>
          <p className={styles.lede}>
            Sauce on the tray. Steam in the box. Gone fast.
          </p>
        </div>

        <figure className={styles.mediaFrame}>
          <Image
            src={PICKUP_IMAGE_SRC}
            alt="Birdside wings held outside the Katy food truck."
            width={858}
            height={960}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), 620px"
            className={styles.image}
          />
        </figure>
      </section>

      <section className={`${styles.chapter} ${styles.chapterMap}`} aria-labelledby="map-heading">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Pull up</p>
          <h2 id="map-heading" className={styles.sectionTitle}>
            Easy to find.
          </h2>
          <p className={styles.lede}>1989 N Fry Rd. Katy, TX 77449. Open nightly.</p>
          <div className={styles.actions}>
            <div className="home-header_button-wrap">
              <a
                className="home-header_button w-inline-block"
                href={GOOGLE_MAPS_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="home-header_button-text">Get directions</div>
              </a>
            </div>
            <a className={styles.phoneNumber} href="tel:+18328738528">
              (832) 873-8528
            </a>
          </div>
        </div>

        <div className={styles.mapFrame}>
          <iframe
            title="Map to Birdside HTX Katy"
            src={MAP_EMBED_URL}
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <span className={styles.mapMarker} aria-hidden="true">
            B
          </span>
        </div>
      </section>

      <section className={`${styles.chapter} ${styles.finalChapter}`} aria-labelledby="cta-heading">
        <figure className={`${styles.mediaFrame} ${styles.finalImage}`}>
          <Image
            src={TRUCK_IMAGE_SRC}
            alt="Birdside HTX food truck detail at the Katy food park."
            width={1360}
            height={960}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), 680px"
            className={styles.image}
          />
        </figure>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Before you roll through</p>
          <h2 id="cta-heading" className={styles.sectionTitle}>
            Pick your heat. Pull up hungry.
          </h2>
          <div className={styles.actions}>
            <div className="home-header_button-wrap">
              <a
                className="home-header_button w-inline-block"
                href={ORDER_NOW_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="home-header_button-text">Order online</div>
              </a>
            </div>
            <Link className={styles.textLink} href="/menu">
              View menu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
