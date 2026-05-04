"use client";

import styles from "@/components/site/menu-page/peckers-menu-page.module.css";
import { useCallback, useEffect, useRef } from "react";

export type MenuTabNavItem = { id: string; label: string };

type Props = {
  tabs: MenuTabNavItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function MenuPageTabNav({ tabs, activeIndex, onSelect }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollActiveToCenter = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeEl = itemRefs.current[activeIndex];
    if (!activeEl) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    const elCenter =
      elRect.left + elRect.width / 2 - navRect.left + nav.scrollLeft;
    const targetScroll = elCenter - navRect.width / 2;

    nav.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    scrollActiveToCenter();
  }, [scrollActiveToCenter]);

  return (
    <div className={styles.tabNavWrap}>
      <nav className={styles.tabNav} aria-label="Menu categories">
        <div ref={navRef} className={styles.tabScroll}>
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={`${styles.tabBtn} ${idx === activeIndex ? styles.tabBtnActive : ""}`}
              onClick={() => onSelect(idx)}
              aria-current={idx === activeIndex ? "true" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
