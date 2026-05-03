"use client";

import type { OurMenuTab } from "@/lib/our-menu-types";
import type { KeyboardEvent, MutableRefObject } from "react";

type Props = {
  tabs: OurMenuTab[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  baseId: string;
  panelId: string;
  tabRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
  onTabKeyDown: (e: KeyboardEvent<HTMLButtonElement>, i: number) => void;
};

export default function HomeMenuTabBar({
  tabs,
  activeIndex,
  setActiveIndex,
  baseId,
  panelId,
  tabRefs,
  onTabKeyDown
}: Props) {
  return (
    <div className="menu_tabs-menu w-tab-menu" role="tablist">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          aria-controls={panelId}
          aria-selected={activeIndex === i}
          className={[
            "menu_link w-inline-block w-tab-link",
            activeIndex === i ? "w--current" : ""
          ]
            .filter(Boolean)
            .join(" ")}
          data-w-tab={tab.id}
          id={`${baseId}-tab-${i}`}
          role="tab"
          tabIndex={activeIndex === i ? 0 : -1}
          type="button"
          onClick={() => setActiveIndex(i)}
          onKeyDown={(e) => onTabKeyDown(e, i)}
        >
          <div>{tab.label}</div>
        </button>
      ))}
    </div>
  );
}
