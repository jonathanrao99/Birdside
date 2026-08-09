import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL, ORDER_NOW_URL } from "@/lib/site-shell-data";
import styles from "./about-story-page.module.css";

const PROMISES = [
  {
    label: "01",
    title: "100% Halal",
    copy: "No fine print. Halal chicken, clear standards, and food we would serve at home."
  },
  {
    label: "02",
    title: "Fryer Timing",
    copy: "Chicken hits the fryer after the ticket. The box waits for the crunch."
  },
  {
    label: "03",
    title: "Sauce & Crunch",
    copy: "We choose for heat, sauce cling, and texture. If it does not help, it does not stay."
  },
  {
    label: "04",
    title: "Window Check",
    copy: "Family is at the window, packing orders and checking the handoff."
  }
] as const;

const STEPS = [
  "Ticket hits the rail.",
  "Chicken drops, rests, then gets sauced.",
  "The box gets checked and handed off hot."
] as const;

export default function AboutStoryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="about-heading">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Our Story</p>
            <h1 id="about-heading" className={styles.title}>
              Family run.
              <span>Fryer fresh.</span>
              <em>Since 2023.</em>
            </h1>
            <p className={styles.lede}>
              Family-owned in Katy since 2023. 100% halal hot chicken,
              fried after you order and built to leave the truck hot.
            </p>
            <div className={styles.actions}>
              <div className="home-header_button-wrap">
                <Link className="home-header_button w-inline-block" href="/menu">
                  <div className="home-header_button-text">View menu</div>
                </Link>
              </div>
              <a
                className={styles.textLink}
                href={ORDER_NOW_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Order now
              </a>
            </div>
          </div>

          <div className={styles.heroMedia} aria-label="Birdside food truck story images">
            <figure className={`${styles.mediaFrame} ${styles.heroMainPhoto}`}>
              <Image
                src="/assets/home/about-sando.jpg"
                alt="Guest holding Birdside hot chicken sandwiches in front of the food truck."
                width={858}
                height={960}
                priority
                sizes="(max-width: 1024px) calc(100vw - 48px), 620px"
                className={styles.image}
              />
            </figure>
            <div className={styles.heroBadge}>
              <span>100%</span>
              <strong>Halal</strong>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.origin} aria-labelledby="origin-heading">
        <div className={`${styles.sectionInner} ${styles.originPanel}`}>
          <div className={styles.originCopy}>
            <h2 id="origin-heading" className={styles.originTitle}>
              We are Birdside
            </h2>
            <div className={styles.storyCopy}>
              <p>
                Since 2023, our family has run Birdside from the truck, ticket by
                ticket. The food is simple on purpose: hot chicken, halal
                standards, sauces that carry, and boxes served fresh from the
                window.
              </p>
              <p>
                We care about the details that show up fast: the crust, the sauce,
                the heat, the pack, the handoff. Every order should feel like
                somebody in the truck was paying attention.
              </p>
            </div>
            <dl className={styles.storyStats} aria-label="Birdside story facts">
              <div>
                <dt>2023</dt>
                <dd>Family-owned since</dd>
              </div>
              <div>
                <dt>100%</dt>
                <dd>Halal chicken</dd>
              </div>
              <div>
                <dt>Fresh</dt>
                <dd>Cooked to order</dd>
              </div>
            </dl>
          </div>

          <div className={styles.originMedia} aria-hidden="true">
            <Image
              src="/assets/menu/covers/sando.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 46vw, 620px"
              className={styles.originImage}
            />
          </div>

          <p className={styles.originPoster} aria-hidden="true">
            You can&apos;t ignore the crunch
          </p>
        </div>
      </section>

      <section className={styles.promiseSection} aria-labelledby="promise-heading">
        <div className={styles.sectionInner}>
          <div className={styles.centerHeader}>
            <h2 id="promise-heading" className={styles.sectionTitle}>
              Fresh food.
              <span>No shortcuts.</span>
            </h2>
          </div>

          <div className={styles.promiseGrid}>
            {PROMISES.map((item) => (
              <article className={styles.promiseCard} key={item.title}>
                <span className={styles.promiseNumber}>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.truckSection} aria-labelledby="truck-heading">
        <div className={`${styles.sectionInner} ${styles.truckGrid}`}>
          <figure className={`${styles.mediaFrame} ${styles.truckPhoto}`}>
            <Image
              src="/assets/home/template-hero-bg.webp"
              alt="Birdside HTX black food truck in Katy."
              fill
              sizes="(max-width: 1024px) calc(100vw - 48px), 680px"
              className={styles.image}
            />
          </figure>

          <div className={styles.truckCopy}>
            <h2 id="truck-heading" className={styles.sectionTitle}>
              Cooked after
              <span>you order.</span>
            </h2>
            <p className={styles.prose}>
              Every order starts inside the truck, not under a heat lamp.
              Chicken needs heat, sauce needs timing, and every tray has to
              leave the window with the same care.
            </p>
            <ol className={styles.stepList}>
              {STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.qualitySection} aria-labelledby="quality-heading">
        <div className={`${styles.sectionInner} ${styles.qualityGrid}`}>
          <div className={styles.qualityCopy}>
            <h2 id="quality-heading" className={styles.sectionTitle}>
              If it misses,
              <span>it stays.</span>
            </h2>
            <p className={styles.prose}>
              That is the rule. Juicy chicken, crust that holds, sauces with
              real presence, and sides that belong in the same box.
            </p>
          </div>
          <div className={styles.qualityPhotos}>
            <figure className={`${styles.mediaFrame} ${styles.wingsPhoto}`}>
              <Image
                src="/assets/home/about-wings.jpg"
                alt="Saucy Birdside wings held outside the Katy food truck."
                fill
                sizes="(max-width: 1024px) calc(100vw - 48px), 560px"
                className={styles.image}
              />
            </figure>
            <figure className={`${styles.mediaFrame} ${styles.spreadPhoto}`}>
              <Image
                src="/assets/menu/covers/wings-spread.webp"
                alt="Birdside wings, fries, sauces, and sides spread across a table."
                fill
                sizes="(max-width: 1024px) calc(100vw - 48px), 360px"
                className={styles.image}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.thanksSection} aria-labelledby="thanks-heading">
        <div className={styles.thanksInner}>
          <p className={styles.eyebrow}>Thank you</p>
          <h2 id="thanks-heading" className={styles.thanksTitle}>
            Every order helped
            <span>build Birdside.</span>
          </h2>
          <p>
            Whether you pulled up once or bring the whole crew back, thank you.
            Every order, catering request, post, and recommendation has helped
            this family truck grow.
          </p>
          <div className={styles.actionsCentered}>
            <div className="home-header_button-wrap">
              <Link className="home-header_button w-inline-block" href="/menu">
                <div className="home-header_button-text">View menu</div>
              </Link>
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
      </section>
    </div>
  );
}
