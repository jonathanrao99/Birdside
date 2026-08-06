"use client";

import styles from "@/components/site/menu-page/menu-page.module.css";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
import type { OurMenuItem } from "@/lib/our-menu-types";

type Props = {
  item: OurMenuItem | null;
  categoryLabel: string;
  showMeta?: boolean;
};

const BEST_SELLER_NOTES: Record<string, readonly [string, string]> = {
  "/product/the-basket": [
    "Crispy Nashville chicken tender basket near Katy, TX.",
    "Available for pickup and delivery."
  ],
  "/product/wing-8pc-combo": [
    "Saucy 8 piece chicken wing combo near Katy, TX.",
    "Available for pickup and delivery."
  ],
  "/product/the-sando": [
    "One of Katy's favorite Nashville hot chicken sandwiches.",
    "Available for pickup and delivery."
  ],
  "/product/garlic-parmesan-fries": [
    "Crispy garlic parmesan fries near Katy, TX.",
    "Available for pickup and delivery."
  ]
};

function splitSentences(text: string): readonly [string, string] {
  const trimmed = text.trim();
  const firstSentenceEnd = trimmed.search(/[.!?](\s|$)/);
  if (firstSentenceEnd < 0) return [trimmed, ""];

  const first = trimmed.slice(0, firstSentenceEnd + 1).trim();
  const rest = trimmed.slice(firstSentenceEnd + 1).trim();
  return [first, rest];
}

function splitIntoTwoLines(text: string): readonly [string, string] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [text.trim(), ""];

  const target = text.length / 2;
  let bestIndex = 1;
  let bestScore = Number.POSITIVE_INFINITY;
  let lengthSoFar = 0;

  for (let i = 1; i < words.length; i += 1) {
    lengthSoFar += words[i - 1].length + (i > 1 ? 1 : 0);
    const punctuationBonus = /[,;:]$/.test(words[i - 1]) ? -8 : 0;
    const score = Math.abs(lengthSoFar - target) + punctuationBonus;
    if (score < bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

function renderWithAccent(text: string) {
  const parts = text.split(/(Bird Sauce)/g);
  return parts.map((part, index) =>
    part === "Bird Sauce" ? (
      <span key={`${part}-${index}`} className={styles.descAccent}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

function renderDescriptionLines(desc: string) {
  const [primary] = splitSentences(desc);
  const [first, rest] = splitIntoTwoLines(primary);
  return (
    <>
      <span className={styles.descLine}>{renderWithAccent(first)}</span>
      <span className={styles.descLine}>{renderWithAccent(rest)}</span>
    </>
  );
}

function renderDescription(item: OurMenuItem, desc: string) {
  if (item.productHref === "/product/the-basket") {
    return (
      <>
        <span className={styles.descLine}>
          Crispy fried chicken tenders with golden fries or creamy mac,
        </span>
        <span className={styles.descLine}>
          crunchy pickles, and our signature <span className={styles.descAccent}>Bird Sauce</span>.
        </span>
      </>
    );
  }

  if (item.productHref === "/product/wing-8pc-combo") {
    return (
      <>
        <span className={styles.descLine}>
          Eight crispy wings tossed in two bold flavors,
        </span>
        <span className={styles.descLine}>served with seasoned fries and cool house ranch.</span>
      </>
    );
  }

  if (item.productHref === "/product/the-sando") {
    return (
      <>
        <span className={styles.descLine}>
          Crispy Nashville hot chicken, fresh slaw, crunchy pickles,
        </span>
        <span className={styles.descLine}>
          and our signature <span className={styles.descAccent}>Bird Sauce</span>{" "}
          on a toasted brioche bun.
        </span>
      </>
    );
  }

  if (item.productHref === "/product/garlic-parmesan-fries") {
    return (
      <>
        <span className={styles.descLine}>
          Golden fries tossed in garlic butter, parmesan, and herbs,
        </span>
        <span className={styles.descLine}>with a rich, crispy finish.</span>
      </>
    );
  }

  return renderDescriptionLines(desc);
}

function getDescriptionNote(item: OurMenuItem, categoryLabel: string) {
  const bestSellerNote = BEST_SELLER_NOTES[item.productHref];
  if (bestSellerNote) return bestSellerNote;

  const note = item.descriptionNote?.trim();
  if (note) return splitSentences(note);

  const [, localLine] = splitSentences(item.description);
  if (localLine) return [localLine, "Available for pickup and delivery."] as const;

  return [`${item.name} near Katy, TX.`, "Available for pickup and delivery."] as const;
}

function renderDescriptionNote(item: OurMenuItem, categoryLabel: string) {
  const note = getDescriptionNote(item, categoryLabel);
  return (
    <>
      <span className={styles.descNoteLine}>{note[0]}</span>
      {note[1] ? (
        <span className={styles.descNoteLine}>
          {note[1]}
        </span>
      ) : null}
    </>
  );
}

export default function MenuPageDetails({ item, categoryLabel, showMeta = true }: Props) {
  if (!item) return null;

  const desc = item.description?.trim();
  const hasDesc = desc.length > 0;

  return (
    <div className={styles.details} aria-live="polite" aria-atomic="true">
      {hasDesc ? <p className={styles.desc}>{renderDescription(item, desc)}</p> : null}
      <p className={styles.descNote}>{renderDescriptionNote(item, categoryLabel)}</p>
      <div className={styles.price}>
        <span className={`${styles.priceBurst} ${styles.priceBurstLeft}`} aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.priceValue}>{item.price}</span>
        <span className={`${styles.priceBurst} ${styles.priceBurstRight}`} aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </div>
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
      </div>
      {showMeta ? (
        <div className={styles.meta}>
          <span className={styles.metaMuted}>{categoryLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
