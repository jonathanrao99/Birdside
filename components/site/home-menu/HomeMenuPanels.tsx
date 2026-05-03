"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import HomeMenuItemRow from "@/components/site/home-menu/HomeMenuItemRow";
import type { OurMenuTab } from "@/lib/our-menu-types";

type Props = {
  tabs: OurMenuTab[];
  activeIndex: number;
  baseId: string;
  panelId: string;
};

export default function HomeMenuPanels({
  tabs,
  activeIndex,
  baseId,
  panelId
}: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const tab = tabs[activeIndex];
  if (!tab) return null;

  const instant = reducedMotion ? { duration: 0 } : false;

  return (
    <div aria-live="polite" className="menu_tabs-content w-tab-content">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={tab.id}
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          className="menu_item w-tab-pane w--tab-active"
          data-w-tab={tab.id}
          exit={{ opacity: 0, y: -4 }}
          id={panelId}
          initial={{ opacity: 0, y: 6 }}
          role="tabpanel"
          transition={
            instant
              ? instant
              : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
          }
        >
          <div className="menu_wrapper">
            <div className="menu_list" role="list">
              {tab.items.map((item) => (
                <HomeMenuItemRow
                  key={`${tab.id}-${item.productHref}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
