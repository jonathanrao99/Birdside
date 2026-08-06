import Image from "next/image";
import Link from "next/link";
import { BIRDSIDE_FAQS, LOCAL_BUSINESS } from "@/lib/local-seo";
import styles from "./faq-page.module.css";

export default function FaqPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero} aria-labelledby="faq-heading">
        <p className={styles.eyebrow}>Katy hot chicken • pickup</p>
        <h1 id="faq-heading" className={styles.title}>
          Got
          <span>questions?</span>
        </h1>
        <p className={styles.lede}>
          Quick answers about Birdside HTX hours, location, ordering, menu, and
          visiting us in Katy.
        </p>
      </header>

      <section className={styles.faqSection} aria-labelledby="faq-list-heading">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>FAQ</p>
          <div className={styles.faqList}>
            {BIRDSIDE_FAQS.map((item) => (
              <details className={styles.faqItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <div className={styles.faqFooter}>
            <p>
              Still need help? <Link href="/contact">Contact us</Link> or call{" "}
              <a href={`tel:${LOCAL_BUSINESS.phone}`}>
                {LOCAL_BUSINESS.displayPhone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
