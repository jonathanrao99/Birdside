"use client";

import MenuPageCarousel, {
  type MenuCarouselItem
} from "@/components/site/menu-page/MenuPageCarousel";
import MenuPageDetails from "@/components/site/menu-page/MenuPageDetails";
import menuData from "@/content/generated/our-menu.json";
import type { OurMenuData, OurMenuItem } from "@/lib/our-menu-types";
import { useMemo, useState } from "react";
import styles from "./home-best-sellers.module.css";

const BEST_SELLER_HREFS = [
  "/product/the-basket",
  "/product/wing-8pc-combo",
  "/product/the-sando",
  "/product/garlic-parmesan-fries"
] as const;

const SELECTED_SCALE_BOOST: Partial<Record<(typeof BEST_SELLER_HREFS)[number], number>> = {
  "/product/the-basket": 1.12,
  "/product/wing-8pc-combo": 1.36,
  "/product/the-sando": 1.24,
  "/product/garlic-parmesan-fries": 1
};

const BEST_SELLER_SUBTITLES: Record<(typeof BEST_SELLER_HREFS)[number], string> = {
  "/product/the-basket": "Golden tenders, built for sauce pulls.",
  "/product/wing-8pc-combo": "Saucy wings with real crunch.",
  "/product/the-sando": "A first-bite kind of sandwich.",
  "/product/garlic-parmesan-fries": "Crisp fries with a savory finish."
};

const data = menuData as OurMenuData;

function findBestSellers(): OurMenuItem[] {
  const items = data.tabs.flatMap((tab) => tab.items);
  return BEST_SELLER_HREFS.map((href) => items.find((item) => item.productHref === href)).filter(
    (item): item is OurMenuItem => Boolean(item)
  );
}

function toCarouselItems(items: OurMenuItem[]): MenuCarouselItem[] {
  return items.map((item) => ({
    image: item.imageSrc,
    name: item.name,
    boost: SELECTED_SCALE_BOOST[item.productHref as (typeof BEST_SELLER_HREFS)[number]] ?? 1
  }));
}

export default function HomeBestSellers() {
  const bestSellers = useMemo(() => findBestSellers(), []);
  const carouselItems = useMemo(() => toCarouselItems(bestSellers), [bestSellers]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = bestSellers[activeIndex] ?? bestSellers[0] ?? null;
  const subtitle = activeItem
    ? BEST_SELLER_SUBTITLES[activeItem.productHref as (typeof BEST_SELLER_HREFS)[number]]
    : undefined;

  if (bestSellers.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="home-best-sellers-heading">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Fan favorites</p>
        <h2 id="home-best-sellers-heading" className={styles.heading}>
          Best sellers
        </h2>
      </div>

      <MenuPageCarousel
        items={carouselItems}
        onActiveIndexChange={setActiveIndex}
        titleTag="h3"
      />
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      <MenuPageDetails item={activeItem} categoryLabel="Best sellers" showMeta={false} />
    </section>
  );
}
