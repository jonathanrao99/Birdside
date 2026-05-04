"use client";

import styles from "@/components/site/menu-page/peckers-menu-page.module.css";
import { ORDER_NOW_URL } from "@/lib/site-shell-data";
import type { OurMenuItem } from "@/lib/our-menu-types";
import Link from "next/link";

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
        <a
          className={styles.btn}
          href={ORDER_NOW_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Order now
        </a>
        <Link className={`${styles.btn} ${styles.btnGhost}`} href={item.productHref}>
          View item
        </Link>
      </div>
      <div className={styles.meta}>
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem" }}>
          {categoryLabel}
        </span>
      </div>
    </div>
  );
}
