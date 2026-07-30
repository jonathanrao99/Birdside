import Image from "next/image";
import styles from "./catering-page.module.css";

const CATERING_EMAIL = "catering@birdsidehtx.com";
const CATERING_MAILTO = `mailto:${CATERING_EMAIL}?subject=Catering%20Quote%20Request`;

const EVENT_TYPES = [
  "Office lunch",
  "Corporate event",
  "Team meal",
  "Birthday or party",
  "School or community event",
  "Wedding or rehearsal",
  "Other"
] as const;

const BUDGET_OPTIONS = [
  "Under $250",
  "$250-$500",
  "$500-$1,000",
  "$1,000-$2,500",
  "$2,500+",
  "Not sure yet"
] as const;

const FAQS = [
  ["How much notice?", "Forty-eight hours is best for larger catering orders so we can plan prep, packaging, and pickup timing. If your event is sooner, send the request and we will confirm what is possible."],
  ["How many people does a tray feed?", "It depends on the mix of wings, sandos, tenders, and sides. Send your headcount and appetite level, and we will recommend quantities that make sense."],
  ["Can I customize sauces?", "Yes. We can split sauces and heat levels across trays so the whole group has options. Add any sauce preferences or heat limits in the notes."],
  ["Pickup only?", "Catering is currently built around pickup from Katy. We will help time the order so everything is packed hot and ready when you arrive."],
  ["Can I mix proteins?", "Yes. Wings, tenders, sandos, and sides can all be built into one spread. We will help balance the order so it feels complete without overcomplicating it."]
] as const;

export default function CateringPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="catering-heading">
        <div className={styles.heroGrid}>
          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>Katy catering • halal • pickup</p>
            <h1 id="catering-heading" className={styles.title}>
              Feed the
              <span>whole room.</span>
              <em>Keep the heat.</em>
            </h1>
            <p className={styles.lede}>
              Halal hot chicken for the whole room. Wings, sandos, loaded fries,
              and mac packed fresh in Katy for crews that show up hungry.
            </p>
            <p className={styles.shortLine}>Big trays. No quiet bites.</p>
            <div className={styles.actions}>
              <div className="home-header_button-wrap">
                <a className="home-header_button w-inline-block" href="#catering-inquiry">
                  <div className="home-header_button-text">Get a quote</div>
                </a>
              </div>
              <a className={styles.textLink} href="#packages">
                View packages
              </a>
            </div>
            <p className={styles.heroMeta}>Katy pickup. 48-hour notice recommended.</p>
          </div>

          <figure className={styles.heroPhoto}>
            <Image
              src="/assets/home/hero-wings-tray.jpg"
              alt="Birdside catering spread with wings, sandos, loaded fries, mac, and drinks."
              width={1024}
              height={614}
              priority
              sizes="(max-width: 1024px) calc(100vw - 48px), 640px"
              className={styles.image}
            />
          </figure>
        </div>
      </header>

      <section className={styles.fullBleedStory} aria-labelledby="table-heading">
        <div className={styles.sectionInner}>
          <figure className={styles.fullImage}>
            <Image
              src="/assets/menu/covers/wings-spread.webp"
              alt="Birdside wing trays and seasoned fries arranged across a table."
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), 1280px"
              className={styles.image}
            />
          </figure>
          <div className={styles.editorialLine}>
            <p className={styles.eyebrow}>Built for groups</p>
            <h2 id="table-heading" className={styles.sectionTitle}>Built for the table</h2>
            <p>Trays down. Sauce open. The room knows what to do.</p>
          </div>
        </div>
      </section>

      <section id="packages" className={styles.splitSection} aria-labelledby="packages-heading">
        <div className={`${styles.sectionInner} ${styles.splitGrid}`}>
          <figure className={styles.splitPhoto}>
            <Image
              src="/assets/home/location-hero-118.jpg"
              alt="Birdside wing box with fries, mac, and sauces."
              fill
              sizes="(max-width: 1024px) calc(100vw - 48px), 650px"
              className={styles.image}
            />
          </figure>

          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>Packages</p>
            <h2 id="packages-heading" className={styles.sectionTitle}>
              Choose the
              <span>spread.</span>
            </h2>
            <p className={styles.prose}>
              Wings, sandos, sides, sauce. Tell us the crowd and we&apos;ll build the spread.
            </p>
            <dl className={styles.packageList}>
              <div>
                <dt>Wing trays</dt>
                <dd>Crispy, sauced, split by flavor.</dd>
              </div>
              <div>
                <dt>Sando boxes</dt>
                <dd>Hot chicken, slaw, pickles, fries.</dd>
              </div>
              <div>
                <dt>Loaded sides</dt>
                <dd>Fries, mac, slaw, drinks, extra sauce.</dd>
              </div>
            </dl>
            <a className={styles.textLink} href="#catering-inquiry">
              Request catering
            </a>
          </div>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="process-heading">
        <div className={`${styles.sectionInner} ${styles.processGrid}`}>
          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>How it works</p>
            <h2 id="process-heading" className={styles.sectionTitle}>
              Hot food.
              <span className={styles.nowrap}>Clean handoff.</span>
            </h2>
            <ol className={styles.timeline}>
              <li>Tell us your event.</li>
              <li>Choose your food.</li>
              <li>We build your trays.</li>
              <li>Pickup hot. Feed everyone.</li>
            </ol>
          </div>

          <figure className={styles.processPhoto}>
            <Image
              src="/assets/home/template-hero-bg.webp"
              alt="Birdside HTX truck staged for Katy pickup orders."
              fill
              sizes="(max-width: 1024px) calc(100vw - 48px), 620px"
              className={styles.image}
            />
          </figure>
        </div>
      </section>

      <section id="catering-inquiry" className={styles.inquirySection} aria-labelledby="inquiry-heading">
        <div className={`${styles.sectionInner} ${styles.inquiryGrid}`}>
          <div className={styles.inquiryIntro}>
            <p className={styles.eyebrow}>Catering inquiry</p>
            <h2 id="inquiry-heading" className={styles.sectionTitle}>
              Tell us the
              <span>headcount.</span>
            </h2>
            <p className={styles.prose}>Send the basics. We&apos;ll shape the order.</p>
            <a className={styles.emailLink} href={CATERING_MAILTO}>{CATERING_EMAIL}</a>
          </div>

          <form className={styles.formPanel} action={CATERING_MAILTO} method="post" encType="text/plain">
            <div className={styles.formGrid}>
              <label className={styles.field} htmlFor="catering-name">
                <span>Name</span>
                <input id="catering-name" name="name" type="text" autoComplete="name" required />
              </label>

              <label className={styles.field} htmlFor="catering-business">
                <span>Business <em>optional</em></span>
                <input id="catering-business" name="business" type="text" autoComplete="organization" />
              </label>

              <label className={styles.field} htmlFor="catering-phone">
                <span>Phone</span>
                <input id="catering-phone" name="phone" type="tel" autoComplete="tel" required />
              </label>

              <label className={styles.field} htmlFor="catering-email">
                <span>Email</span>
                <input id="catering-email" name="email" type="email" autoComplete="email" required />
              </label>

              <label className={styles.field} htmlFor="catering-date">
                <span>Event date</span>
                <input id="catering-date" name="event_date" type="date" required />
              </label>

              <label className={styles.field} htmlFor="catering-time">
                <span>Pickup time</span>
                <input id="catering-time" name="pickup_time" type="time" required />
              </label>

              <label className={styles.field} htmlFor="catering-guests">
                <span>Guest count</span>
                <input id="catering-guests" name="guest_count" type="number" min="1" inputMode="numeric" required />
              </label>

              <label className={styles.field} htmlFor="catering-event-type">
                <span>Event type</span>
                <select id="catering-event-type" name="event_type" required defaultValue="">
                  <option value="" disabled>Select event type</option>
                  {EVENT_TYPES.map((type) => (
                    <option value={type} key={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className={styles.field} htmlFor="catering-budget">
                <span>Budget</span>
                <select id="catering-budget" name="estimated_budget" required defaultValue="">
                  <option value="" disabled>Select budget</option>
                  {BUDGET_OPTIONS.map((budget) => (
                    <option value={budget} key={budget}>{budget}</option>
                  ))}
                </select>
              </label>

              <fieldset className={styles.fieldset}>
                <legend>Preferred contact</legend>
                <div className={styles.radioGroup}>
                  <label><input type="radio" name="preferred_contact" value="Phone" required /> Phone</label>
                  <label><input type="radio" name="preferred_contact" value="Text" /> Text</label>
                  <label><input type="radio" name="preferred_contact" value="Email" /> Email</label>
                </div>
              </fieldset>

              <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="catering-notes">
                <span>Additional notes</span>
                <textarea id="catering-notes" name="additional_notes" rows={6} placeholder="Heat levels, sauces, dietary notes, timing, or anything the crew should know." />
              </label>
            </div>

            <p className={styles.formNote}>We usually reply within one business day with next steps, timing, and tray recommendations.</p>
            <button className={styles.submitButton} type="submit">Request catering</button>
          </form>
        </div>

        <div className={`${styles.sectionInner} ${styles.faqBlock}`}>
          <p className={styles.eyebrow}>FAQ</p>
          <div className={styles.faqList}>
            {FAQS.map(([question, answer]) => (
              <details className={styles.faqItem} key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-heading">
        <div className={styles.finalInner}>
          <h2 id="final-cta-heading" className={styles.finalTitle}>
            <span className={styles.nowrap}>Ready to feed</span>
            your crew?
          </h2>
          <div className={styles.actions}>
            <div className="home-header_button-wrap">
              <a className="home-header_button w-inline-block" href="#catering-inquiry">
                <div className="home-header_button-text">Get a quote</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
