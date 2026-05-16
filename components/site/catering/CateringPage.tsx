import Link from "next/link";
import {
  ORDER_NOW_URL,
  GOOGLE_MAPS_URL
} from "@/lib/site-shell-data";
import styles from "./catering-page.module.css";

const INCLUDED = [
  {
    title: "Chicken done hot",
    body: "Trays of tenders, wings, or sandwiches—built so breading stays crisp through pickup."
  },
  {
    title: "Sides & dips",
    body: "Slaw, fries, mac—paired with what your crowd actually eats. Sauces from our lineup."
  },
  {
    title: "Portion guidance",
    body: "Tell us headcount and budget—we’ll suggest trays so nobody leaves hungry."
  }
] as const;

export default function CateringPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Katy · trays & pickup</p>
          <h1 id="catering-heading" className={styles.title}>
            Catering
          </h1>
          <p className={styles.lede}>
            Feed the office, the sideline, or the whole block party—Birdside hot
            chicken, sides, and house sauces in Katy. We package for pickup so you
            can serve it fresh on your timeline.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.btnPrimary}>
              Plan your order
            </Link>
            <a
              href={ORDER_NOW_URL}
              className={styles.btnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              Square pickup
            </a>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="included-heading">
        <div className={styles.sectionInner}>
          <h2 id="included-heading" className={styles.sectionTitle}>
            What we bring
          </h2>
          <div className={styles.grid}>
            {INCLUDED.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="steps-heading">
        <div className={styles.sectionInner}>
          <h2 id="steps-heading" className={styles.sectionTitle}>
            How it works
          </h2>
          <ol className={styles.steps}>
            <li className={styles.step}>
              <p className={styles.stepTitle}>Reach out</p>
              <p className={styles.stepBody}>
                Hit{" "}
                <Link href="/contact" className={styles.inlineLink}>
                  Contact
                </Link>{" "}
                with date, approximate guests, and anything dietary we should
                know.
              </p>
            </li>
            <li className={styles.step}>
              <p className={styles.stepTitle}>Lock the menu</p>
              <p className={styles.stepBody}>
                We align proteins, sides, and sauce quantities with your headcount.
                Browse the{" "}
                <Link href="/menu" className={styles.inlineLink}>
                  menu
                </Link>{" "}
                for what runs daily.
              </p>
            </li>
            <li className={styles.step}>
              <p className={styles.stepTitle}>Pickup in Katy</p>
              <p className={styles.stepBody}>
                Trays are staged for pickup at{" "}
                <Link
                  href="/locations/katy-tx"
                  className={styles.inlineLink}
                >
                  Birdside Katy
                </Link>
                . Need directions?{" "}
                <a
                  href={GOOGLE_MAPS_URL}
                  className={styles.inlineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
                .
              </p>
            </li>
          </ol>
          <div className={styles.policies}>
            <p>
              <strong>Lead time:</strong> ideally{" "}
              <strong>48 hours notice</strong> for larger trays; tell us if you’re
              inside a week—we’ll say yes when the line can execute it clean.
            </p>
            <p>
              <strong>Minimums:</strong> depend on day and volume—we quote off
              your guest count so pricing stays fair for both sides.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-heading">
        <div className={styles.sectionInner}>
          <h2 id="faq-heading" className={styles.sectionTitle}>
            Quick answers
          </h2>
          <ul className={styles.faqList}>
            <li>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Do you deliver?
                </summary>
                <p className={styles.answer}>
                  Catering is built around{" "}
                  <strong className={styles.answerStrong}>Katy pickup</strong>.
                  Ask when you reach out—occasionally we can coordinate
                  handoff; fees depend on timing and distance.
                </p>
              </details>
            </li>
            <li>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Halal?
                </summary>
                <p className={styles.answer}>
                  Yes—we operate halal. Flag headcount and any allergy notes in
                  your catering message so the kitchen can label trays clearly.
                </p>
              </details>
            </li>
            <li>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Sauce Lab dips?
                </summary>
                <p className={styles.answer}>
                  House sauces are part of the Birdside story—mention favorites in
                  your request and we&apos;ll match quantities to your proteins.
                  Explore flavors on{" "}
                  <Link href="/sauce-lab" className={styles.inlineLink}>
                    Sauce Lab
                  </Link>
                  .
                </p>
              </details>
            </li>
          </ul>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.bottomBand}`}
        aria-labelledby="bottom-cta"
      >
        <div className={styles.bottomInner}>
          <p id="bottom-cta" className={styles.bottomCopy}>
            Need sizes before you commit? Message us—we&apos;ll turn around a tray
            map fast.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/contact" className={styles.btnPrimary}>
              Contact Birdside
            </Link>
            <Link href="/faq" className={styles.btnGhost}>
              FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
