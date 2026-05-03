"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import type { OurMenuData, OurMenuItem } from "@/lib/our-menu-types";

type Props = {
  data: OurMenuData;
};

function MenuItemRow({ item }: { item: OurMenuItem }) {
  return (
    <div className="menu_item" role="listitem">
      <div className="menu_block">
        <div className="menu_block-content">
          <Image
            alt={item.imageAlt}
            className="menu_img"
            height={420}
            loading="lazy"
            sizes={item.imageSizes ?? "(max-width: 767px) 92vw, (max-width: 1199px) 45vw, 420px"}
            src={item.imageSrc}
            width={420}
          />
          <div className="menu_infos">
            <div className="menu_texts">
              <div className="text-color-white">
                <h3 className="menu_name">{item.name}</h3>
              </div>
              <div className="text-color-grey-300">
                <div>{item.price}</div>
              </div>
              <div className="menu_desc text-color-grey-300">{item.description}</div>
            </div>
            <Link
              className="button-icon_component w-inline-block"
              data-w-id={item.buttonWId}
              href={item.productHref}
            >
              <div className="button-icon_text">View</div>
              <div aria-hidden className="lottie-animation-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeMenuClient({ data }: Props) {
  const baseId = useId().replace(/:/g, "");
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(() => {
    const i = data.tabs.findIndex((t) => t.id === data.defaultTabId);
    return i >= 0 ? i : 0;
  });

  const focusTab = useCallback((i: number) => {
    tabRefs.current[i]?.focus();
  }, []);

  const onTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>, i: number) => {
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
                <div className="menu_tabs-menu w-tab-menu" role="tablist">
                  {tabs.map((tab, i) => (
                    <a
                      key={tab.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      aria-controls={`${baseId}-panel-${i}`}
                      aria-selected={activeIndex === i}
                      className={[
                        "menu_link w-inline-block w-tab-link",
                        activeIndex === i ? "w--current" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      data-w-tab={tab.id}
                      href="#"
                      id={`${baseId}-tab-${i}`}
                      role="tab"
                      tabIndex={activeIndex === i ? 0 : -1}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveIndex(i);
                      }}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                    >
                      <div>{tab.label}</div>
                    </a>
                  ))}
                </div>
                <div className="menu_tabs-content w-tab-content">
                  {tabs.map((tab, i) => (
                    <div
                      key={tab.id}
                      aria-hidden={activeIndex !== i}
                      aria-labelledby={`${baseId}-tab-${i}`}
                      className={[
                        "menu_item w-tab-pane",
                        activeIndex === i ? "w--tab-active" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      data-w-tab={tab.id}
                      id={`${baseId}-panel-${i}`}
                      role="tabpanel"
                    >
                      <div className="menu_wrapper">
                        <div className="menu_list" role="list">
                          {tab.items.map((item) => (
                            <MenuItemRow
                              key={`${tab.id}-${item.productHref}`}
                              item={item}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
