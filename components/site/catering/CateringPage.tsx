import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL, ORDER_NOW_URL } from "@/lib/site-shell-data";
import styles from "./catering-page.module.css";

const CATERING_IMAGES = [
  {
    src: "/assets/home/hero-wings-tray.jpg",
    alt: "Birdside catering spread with wings, sandos, loaded fries, mac, and drinks on a picnic table."
  },
  {
    src: "/assets/menu/covers/wings-spread.webp",
    alt: "Overhead Birdside tray spread with wings, sandos, fries, mac, sauces, and pickles."
  },
  {
    src: "/assets/menu/footer-banner.webp",
    alt: "Birdside hot chicken catering trays arranged for a group order."
  },
  {
    src: "/assets/home/about-wings.jpg",
    alt: "Saucy Birdside wings and seasoned fries ready for sharing."
  },
  {
    src: "/assets/home/about-sando.jpg",
    alt: "Birdside hot chicken sandwich and sides prepared for pickup."
  }
] as const;

const PACKAGES = [
  {
    title: "Wing trays",
    body: "Sauced, dry-rubbed, or split by flavor with ranch, Bird Sauce, and napkins ready for the table.",
    meta: "Best for game nights"
  },
  {
    title: "Sando boxes",
    body: "Hot chicken sandos with slaw, pickles, fries, and sauce packed tight for office lunches or parties.",
    meta: "Clean handoff"
  },
  {
    title: "Sides & drinks",
    body: "Mac, seasoned fries, loaded fries, slaw, bottled drinks, and extra sauce so the order feels complete.",
    meta: "Crowd insurance"
  }
] as const;

const STEPS = [
  "Send date, pickup time, headcount, and the kind of crowd you are feeding.",
  "We map proteins, sides, sauces, and portions around your budget and appetite.",
  "Pickup from Katy with trays staged hot, labeled, and ready to run."
] as const;

export default function CateringPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="catering-heading">
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src={CATERING_IMAGES[0].src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroShade} />
        </div>

        <div className={styles.heroInner}>
          <p className={styles.kicker}>Katy catering · halal hot chicken</p>
          <h1 id="catering-heading" className={styles.title}>
            Catering that
            <span className={styles.titleAccent}>feeds the whole flock.</span>
          </h1>
          <p className={styles.lede}>
            Birdside trays bring hot chicken sandos, wings, loaded fries, mac,
            drinks, pickles, and house sauces to offices, parties, teams, and
            late-night crews across Katy and West Houston.
          </p>
          <div className={styles.heroStats} aria-label="Catering highlights">
            <span>Halal</span>
            <span>Pickup in Katy</span>
            <span>Built for groups</span>
          </div>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.btnPrimary}>
              Start a catering order
            </Link>
            <a
              href={ORDER_NOW_URL}
              className={styles.btnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order pickup
            </a>
          </div>
        </div>
      </header>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {Array.from({ length: 2 }).map((_, group) => (
            <div className={styles.marqueeGroup} key={group}>
              <span>Wings by the tray</span>
              <span>Sandos stacked</span>
              <span>Mac, fries, sauce</span>
              <span>Katy pickup</span>
              <span>Late-night friendly</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.intro} aria-labelledby="intro-heading">
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}>No sad party platters</p>
          <h2 id="intro-heading" className={styles.sectionTitle}>
            Big trays. Real crunch. Sauce on deck.
          </h2>
          <p className={styles.prose}>
            Catering should still taste like Birdside: crisp breading, bold heat,
            full sauce cups, and sides people actually finish. Tell us the crowd
            size and vibe, and we&apos;ll help build the right tray mix.
          </p>
        </div>
        <div className={styles.introImageWrap}>
          <Image
            src={CATERING_IMAGES[1].src}
            alt={CATERING_IMAGES[1].alt}
            fill
            sizes="(max-width: 899px) 100vw, 44vw"
            className={styles.coverImage}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="packages-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Build the spread</p>
            <h2 id="packages-heading" className={styles.sectionTitle}>
              What to order
            </h2>
          </div>
          <div className={styles.packageGrid}>
            {PACKAGES.map((item) => (
              <article className={styles.packageCard} key={item.title}>
                <p className={styles.packageMeta}>{item.meta}</p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery} aria-label="Birdside catering food gallery">
        <div className={styles.galleryWide}>
          <Image
            src={CATERING_IMAGES[2].src}
            alt={CATERING_IMAGES[2].alt}
            fill
            sizes="100vw"
            className={styles.coverImage}
          />
        </div>
        <div className={styles.galleryPair}>
          <div className={styles.galleryTile}>
            <Image
              src={CATERING_IMAGES[3].src}
              alt={CATERING_IMAGES[3].alt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className={styles.coverImage}
            />
          </div>
          <div className={styles.galleryTile}>
            <Image
              src={CATERING_IMAGES[4].src}
              alt={CATERING_IMAGES[4].alt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className={styles.coverImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="steps-heading">
        <div className={`${styles.sectionInner} ${styles.stepsLayout}`}>
          <div>
            <p className={styles.eyebrow}>Fast planning</p>
            <h2 id="steps-heading" className={styles.sectionTitle}>
              How catering works
            </h2>
            <p className={styles.prose}>
              We keep the process direct because your event already has enough
              moving parts. Larger orders are best with 48 hours notice.
            </p>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li className={styles.step} key={step}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.bottomBand} aria-labelledby="bottom-heading">
        <div className={styles.bottomInner}>
          <div>
            <p className={styles.eyebrow}>Ready when you are</p>
            <h2 id="bottom-heading" className={styles.bottomTitle}>
              Tell us the headcount. We&apos;ll bring the heat.
            </h2>
          </div>
          <div className={styles.bottomActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Contact Birdside
            </Link>
            <a
              href={GOOGLE_MAPS_URL}
              className={styles.btnGhostDark}
              target="_blank"
              rel="noopener noreferrer"
            >
              Katy pickup map
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
