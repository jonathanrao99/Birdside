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

  return desc;
}

function getDescriptionNote(item: OurMenuItem) {
  return BEST_SELLER_NOTES[item.productHref] ?? null;
}

function renderDescriptionNote(item: OurMenuItem, note: string) {
  const bestSellerNote = getDescriptionNote(item);
  if (!bestSellerNote) return note;

  return (
    <>
      {bestSellerNote[0]}
      <br />
      {bestSellerNote[1]}
    </>
  );
}

export default function MenuPageDetails({ item, categoryLabel, showMeta = true }: Props) {
  if (!item) return null;

  const desc = item.description?.trim();
  const hasDesc = desc.length > 0;
  const note = item.descriptionNote?.trim() ?? getDescriptionNote(item)?.join(" ");

  return (
    <div className={styles.details}>
      {hasDesc ? <p className={styles.desc}>{renderDescription(item, desc)}</p> : null}
      {note ? <p className={styles.descNote}>{renderDescriptionNote(item, note)}</p> : null}
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
