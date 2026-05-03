"use client";

import Image from "next/image";
import HomeMenuPanels from "@/components/site/home-menu/HomeMenuPanels";
import HomeMenuTabBar from "@/components/site/home-menu/HomeMenuTabBar";
import type { OurMenuData } from "@/lib/our-menu-types";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

type Props = {
  data: OurMenuData;
};

export default function HomeMenuClient({ data }: Props) {
  const baseId = useId().replace(/:/g, "");
  const panelId = `${baseId}-panel`;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(() => {
    const i = data.tabs.findIndex((t) => t.id === data.defaultTabId);
    return i >= 0 ? i : 0;
  });

  const focusTab = useCallback((i: number) => {
    tabRefs.current[i]?.focus();
  }, []);

  const onTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
      const k = e.key;
      if (k !== "ArrowLeft" && k !== "ArrowRight" && k !== "Home" && k !== "End")
        return;
      e.preventDefault();
      const n = data.tabs.length;
      let next = i;
      if (k === "ArrowRight") next = (i + 1) % n;
      else if (k === "ArrowLeft") next = (i - 1 + n) % n;
      else if (k === "Home") next = 0;
      else if (k === "End") next = n - 1;
      setActiveIndex(next);
      requestAnimationFrame(() => focusTab(next));
    },
    [data.tabs.length, focusTab]
  );

  const { cover, pattern, heading, tabs } = data;

  return (
    <section className="section_home-menu">
      <div className="home-menu_cover-wrap">
        <Image
          alt={cover.alt}
          className="menu_cover"
          data-w-id={cover.dataWId}
          height={cover.height ?? 1705}
          loading="lazy"
          sizes={cover.sizes ?? "100vw"}
          src={cover.src}
          width={cover.width ?? 2560}
        />
        {pattern?.dataWId !== undefined ? (
          <div className="menu_pattern" data-w-id={pattern.dataWId} />
        ) : (
          <div className="menu_pattern" />
        )}
      </div>
      <div className="menu_content">
        <div className="padding-section-small" />
        <div className="padding-global">
          <div className="container-small">
            <div className="menu_component">
              <div className="text-color-white">
                <h2>{heading}</h2>
              </div>
              <div className="spacer-large" />
              <div
                className="menu_tabs w-tabs"
                data-current={tabs[activeIndex]?.id}
                data-duration-in="300"
                data-duration-out="100"
                data-easing="ease"
              >
                <HomeMenuTabBar
                  activeIndex={activeIndex}
                  baseId={baseId}
                  panelId={panelId}
                  setActiveIndex={setActiveIndex}
                  tabRefs={tabRefs}
                  tabs={tabs}
                  onTabKeyDown={onTabKeyDown}
                />
                <HomeMenuPanels
                  activeIndex={activeIndex}
                  baseId={baseId}
                  panelId={panelId}
                  tabs={tabs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
