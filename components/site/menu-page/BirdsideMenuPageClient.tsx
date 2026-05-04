"use client";

import styles from "@/components/site/menu-page/peckers-menu-page.module.css";
import MenuPageCarousel, {
  type MenuCarouselItem
} from "@/components/site/menu-page/MenuPageCarousel";
import MenuPageDetails from "@/components/site/menu-page/MenuPageDetails";
import MenuPageTabNav from "@/components/site/menu-page/MenuPageTabNav";
import type { OurMenuData } from "@/lib/our-menu-types";
import { useCallback, useMemo, useState } from "react";

type Props = {
  data: OurMenuData;
};

function toCarouselItems(tabIndex: number, data: OurMenuData): MenuCarouselItem[] {
  const tab = data.tabs[tabIndex];
  if (!tab) return [];
  return tab.items.map((it) => ({
    image: it.imageSrc,
    name: it.name,
    boost: 1
  }));
}

export default function BirdsideMenuPageClient({ data }: Props) {
  const initialTab = useMemo(() => {
    const i = data.tabs.findIndex((t) => t.id === data.defaultTabId);
    return i >= 0 ? i : 0;
  }, [data.defaultTabId, data.tabs]);

  const [tabIndex, setTabIndex] = useState(initialTab);
  const [itemIndex, setItemIndex] = useState(0);

  const activeTab = data.tabs[tabIndex];
  const carouselItems = useMemo(
    () => toCarouselItems(tabIndex, data),
    [data, tabIndex]
  );

  const navTabs = useMemo(
    () => data.tabs.map((t) => ({ id: t.id, label: t.label })),
    [data.tabs]
  );

  const onSelectTab = useCallback((i: number) => {
    setTabIndex(i);
    setItemIndex(0);
  }, []);

  const activeItem = activeTab?.items[itemIndex] ?? activeTab?.items[0] ?? null;

  if (!activeTab || carouselItems.length === 0) return null;

  return (
    <div className={styles.root} id="main-content">
      <MenuPageTabNav
        activeIndex={tabIndex}
        onSelect={onSelectTab}
        tabs={navTabs}
      />
      <MenuPageCarousel
        key={`${data.version}-${activeTab.id}`}
        items={carouselItems}
        onActiveIndexChange={setItemIndex}
      />
      <MenuPageDetails item={activeItem} categoryLabel={activeTab.label} />
    </div>
  );
}
