"use client";

import styles from "@/components/site/menu-page/peckers-menu-page.module.css";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
import type { OurMenuItem } from "@/lib/our-menu-types";

type Props = {
  item: OurMenuItem | null;
  categoryLabel: string;
};

export default function MenuPageDetails({ item, categoryLabel }: Props) {
  if (!item) return null;

  const desc = item.description?.trim();
  const hasDesc = desc.length > 0;

  return (
    <div className={styles.details}>
      {hasDesc ? <p className={styles.desc}>{desc}</p> : null}
      <div className={styles.price}>{item.price}</div>
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
      <div className={styles.meta}>
        <span className={styles.metaMuted}>{categoryLabel}</span>
      </div>
    </div>
  );
}
