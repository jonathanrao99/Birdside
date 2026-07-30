import Image from "next/image";
import Link from "next/link";
import { GOOGLE_MAPS_URL } from "@/lib/site-shell-data";
import styles from "./about-story-page.module.css";

const BELIEFS = [
  {
    title: "Fresh Every Order",
    copy: "Fresh from the fryer.",
    src: "/assets/home/location-hero-118.jpg",
    alt: "Birdside hot chicken box with wings, fries, mac, and sauces.",
    reverse: false
  },
  {
    title: "Halal Always",
    copy: "No fine print.",
    src: "/assets/home/template-hero-bg.webp",
    alt: "Birdside HTX black food truck with halal signage in Katy.",
    reverse: true
  },
  {
    title: "Worth The Mess",
    copy: "Flavor you remember.",
    src: "/assets/home/about-wings.jpg",
    alt: "Saucy Birdside wings held outside the Katy truck.",
    reverse: false
  }
] as const;

const COMMUNITY_IMAGES = [
  {
    src: "/assets/home/about-sando.jpg",
    alt: "Guest holding Birdside hot chicken sandwiches in front of the truck."
  },
  {
    src: "/assets/menu/footer-banner.webp",
    alt: "Birdside group order spread on an outdoor table."
  },
  {
    src: "/assets/menu/items/photo-vdv06487.jpg",
    alt: "Drinks on Birdside checker paper at the outdoor tables."
  }
] as const;

export default function AboutStoryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="about-heading">
        <div className={styles.heroGrid}>
          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>Our Story</p>
            <h1 id="about-heading" className={styles.title}>
              Late-night chicken.
              <em>Done right.</em>
            </h1>
            <p className={styles.lede}>
              Because late-night food should still hit like somebody cared.
            </p>
            <div className={styles.actions}>
              <div className="home-header_button-wrap">
                <Link className="home-header_button w-inline-block" href="/menu">
                  <div className="home-header_button-text">Our menu</div>
                </Link>
              </div>
              <Link className={styles.textLink} href="/locations/katy-tx">
                Find us
              </Link>
            </div>
          </div>

          <figure className={styles.heroPhoto}>
            <Image
              src="/assets/home/about-sando.jpg"
              alt="Guest holding Birdside sandwiches in front of the Katy truck."
              width={858}
              height={960}
              priority
              sizes="(max-width: 1024px) calc(100vw - 48px), 620px"
              className={styles.image}
            />
          </figure>
        </div>
      </header>

      <section className={styles.origin} aria-labelledby="origin-heading">
        <div className={styles.sectionInner}>
          <h2 id="origin-heading" className={styles.sectionTitle}>
            One truck.
            <span>One standard.</span>
          </h2>
          <figure className={styles.widePhoto}>
            <Image
              src="/assets/home/template-hero-bg.webp"
              alt="Birdside HTX food truck parked in Katy."
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), 1280px"
              className={styles.image}
            />
          </figure>
          <p className={styles.statement}>
            A tight menu. Hot boxes. Katy after dark.
          </p>
        </div>
      </section>

      <section className={styles.beliefs} aria-labelledby="beliefs-heading">
        <div className={styles.sectionInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>What we believe</p>
            <h2 id="beliefs-heading" className={styles.sectionTitle}>
              Three things.
              <span>No exceptions.</span>
            </h2>
          </div>

          <div className={styles.beliefStack}>
            {BELIEFS.map((item) => (
              <article
                className={`${styles.beliefRow} ${item.reverse ? styles.beliefReverse : ""}`}
                key={item.title}
              >
                <figure className={styles.beliefPhoto}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) calc(100vw - 48px), 650px"
                    className={styles.image}
                  />
                </figure>
                <div className={styles.beliefCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.behindScenes} aria-labelledby="behind-heading">
        <div className={`${styles.sectionInner} ${styles.behindScenesGrid}`}>
          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>Behind the scenes</p>
            <h2 id="behind-heading" className={styles.sectionTitle}>
              Crunch.
              <span>Sauce. Heat.</span>
            </h2>
            <p className={styles.prose}>
              Every box has to earn the craving.
            </p>
            <Link className={styles.textLink} href="/sauce-lab">
              Explore Sauce Lab →
            </Link>
          </div>

          <div className={styles.behindScenesPhotos}>
            <figure className={styles.kitchenPhoto}>
              <Image
                src="/assets/menu/covers/wings-spread.webp"
                alt="Birdside wings and fries staged for pickup."
                fill
                sizes="(max-width: 1024px) calc(100vw - 48px), 760px"
                className={styles.image}
              />
            </figure>
            <figure className={styles.saucePhoto}>
              <Image
                src="/assets/sauce-lab/images/korean-glaze-bowl.webp"
                alt="Birdside Korean glaze sauce close-up."
                fill
                sizes="(max-width: 1024px) calc(100vw - 48px), 360px"
                className={styles.image}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.community} aria-labelledby="community-heading">
        <div className={styles.sectionInner}>
          <div className={styles.communityHeader}>
            <p className={styles.eyebrow}>Community</p>
            <h2 id="community-heading" className={styles.sectionTitle}>
              Made for
              <span>the crew.</span>
            </h2>
            <p className={styles.prose}>
              The truck became a meeting spot.
            </p>
          </div>

          <div className={styles.communityGallery}>
            {COMMUNITY_IMAGES.map((image) => (
              <figure className={styles.communityPhoto} key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 48px), 33vw"
                  className={styles.image}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-heading">
        <div className={styles.sectionInner}>
          <figure className={styles.finalPhoto}>
            <Image
              src="/assets/home/template-hero-bg.webp"
              alt="Birdside HTX truck ready for Katy pickup."
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), 1280px"
              className={styles.image}
            />
          </figure>
          <div className={styles.finalCopy}>
            <h2 id="final-heading" className={styles.finalTitle}>
              Pull up.
              <span>We&apos;ll handle the rest.</span>
            </h2>
            <div className={styles.actions}>
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
        </div>
      </section>
    </div>
  );
}
