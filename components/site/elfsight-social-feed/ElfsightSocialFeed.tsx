"use client";

import Script from "next/script";
import { useEffect } from "react";
import styles from "./elfsight-social-feed.module.css";

const ELFSIGHT_TWITTER_SOURCE_ERROR = "X: An error occurred while creating twitter source";

function isElfsightTwitterSourceError(args: unknown[]) {
  return args.some(
    (arg) =>
      typeof arg === "string" && arg.includes(ELFSIGHT_TWITTER_SOURCE_ERROR)
  );
}

export default function ElfsightSocialFeed() {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args: unknown[]) => {
      if (isElfsightTwitterSourceError(args)) return;
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <section className={styles.section} aria-label="Birdside HTX social feed and reviews">
      <div className={styles.inner}>
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div className={styles.widgetBlock}>
          <header className={styles.header}>
            <p className={styles.kicker}>Your plate lookin&apos; fire?</p>
            <h2 className={styles.title}>Tag @birdsidehtx</h2>
            <p className={styles.copy}>Post it. Tag us. Get featured.</p>
          </header>
          <div
            className="elfsight-app-e6130c2b-c85a-4aa8-9dbc-713d1e9fe799"
            data-elfsight-app-lazy
          />
        </div>
        <div className={`${styles.widgetBlock} ${styles.reviewBlock}`}>
          <div className={styles.reviewInner}>
            <header className={`${styles.header} ${styles.reviewHeader}`}>
              <div className={styles.stars} aria-hidden>
                ★★★★★
              </div>
              <h2 className={styles.title}>What our clients say</h2>
            </header>
            <div
              className="elfsight-app-fb3fe4c1-4bbb-4507-ad93-7d4835a7eb3e"
              data-elfsight-app-lazy
            />
          </div>
        </div>
      </div>
    </section>
  );
}
