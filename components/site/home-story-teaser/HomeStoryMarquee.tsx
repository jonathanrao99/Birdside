"use client";

import { useReducedMotion } from "motion/react";
import styles from "./home-story-teaser.module.css";

/** One cycle — duplicated many times so the track is wider than the viewport (required for a visible scroll). */
const PAIR = ["Halal", "5 PM – 12:30 AM"] as const;
const SCROLL_CYCLES = 16;

const scrollTags = Array.from(
  { length: SCROLL_CYCLES * PAIR.length },
  (_, i) => PAIR[i % PAIR.length]
);

export default function HomeStoryMarquee() {
  const reducedMotion = useReducedMotion() ?? false;

  const scrollRow = (keyPrefix: string) =>
    scrollTags.map((tag, i) => (
      <span key={`${keyPrefix}-${i}`} className={styles.marqueeItem}>
        {tag}
      </span>
    ));

  return (
    <div className={styles.marquee} aria-hidden="true">
      {reducedMotion ? (
        <div className={styles.marqueeTrackStatic}>
          {PAIR.map((tag, i) => (
            <span key={`static-${i}`} className={styles.marqueeItem}>
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <div className={styles.marqueeTrack}>
          {scrollRow("a")}
          {scrollRow("b")}
        </div>
      )}
    </div>
  );
}
