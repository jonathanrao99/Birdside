"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SubNavbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const itemRefs = useRef([]);

  const navbarData = [
    { title: "BURGERS", link: "/menu" },
    { title: "WRAPS", link: "/menu/wraps" },
    { title: "RICE BOWLS", link: "/menu/rice-bowls" },
    { title: "SALAD BOWLS", link: "/menu/salad-bowls" },
    { title: "WINGS", link: "/menu/wings" },
    { title: "TENDERS", link: "/menu/tenders" },
    { title: "MEAL BOXES AND PLATTERS", link: "/menu/meal-box" },
    { title: "KIDS", link: "/menu/kids" },
    { title: "SIDES", link: "/menu/sides-and-fries" },
    { title: "SHAKES", link: "/menu/drinks-and-desserts" },
  ];

  const scrollActiveToCenter = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeIdx = navbarData.findIndex((item) => {
      const normalizedItemLink = (item.link || "").replace(/\/$/, "");
      const normalizedCurrentPath = pathname.replace(/\/$/, "");
      return (
        normalizedItemLink === normalizedCurrentPath ||
        (normalizedItemLink === "/menu" && normalizedCurrentPath === "/menu")
      );
    });
    const activeEl = itemRefs.current[activeIdx];
    if (!activeEl) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    const elCenter =
      elRect.left + elRect.width / 2 - navRect.left + nav.scrollLeft;
    const targetScroll = elCenter - navRect.width / 2;

    nav.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    scrollActiveToCenter();
  }, [scrollActiveToCenter]);

  return (
    <div className="w-full flex justify-center px-4 md:px-0 z-50 bg-transparent">
      <nav
        className="subnavbar relative group w-full max-w-6xl"
        style={{ color: "white" }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        <div
          ref={navRef}
          className="flex font-sans gap-[4vw] md:gap-6 lg:gap-8 xl:gap-[3.4vw] justify-start lg:justify-between items-center overflow-x-auto no-scrollbar px-2 md:px-6 py-4 md:py-6 lg:py-8 xl:py-[1.5vw] scroll-smooth w-full"
          style={{
            fontFamily: "var(--font-peakers)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {navbarData.map((item, idx) => {
            const title = item.title?.toUpperCase() || "";
            let href = item.link || "#";

            if (title === "BURGERS") href = "/menu";
            else if (title === "WRAPS") href = "/menu/wraps";
            else if (title === "WINGS") href = "/menu/wings";
            else if (title === "TENDERS") href = "/menu/tenders";
            else if (title === "RICE BOWLS")
              href = "/menu/rice-bowls";
            else if (title === "SALAD BOWLS")
              href = "/menu/salad-bowls";
            else if (title === "MEAL BOXES AND PLATTERS")
              href = "/menu/meal-box";
            else if (title === "KIDS") href = "/menu/kids";
            else if (title === "SIDES") href = "/menu/sides-and-fries";
            else if (title === "SHAKES") href = "/menu/drinks-and-desserts";

            const normalizedItemLink = href.replace(/\/$/, "");
            const normalizedCurrentPath = pathname.replace(/\/$/, "");
            const isActive =
              normalizedItemLink === normalizedCurrentPath ||
              (normalizedItemLink === "/menu" &&
                normalizedCurrentPath === "/menu");

            return (
              <Link
                key={idx}
                ref={(el) => (itemRefs.current[idx] = el)}
                href={href}
                className={`whitespace-nowrap pb-1 md:pb-1 tracking-wider text-[16px] sm:text-[20px] md:text-[16px] lg:text-[18px] xl:text-[1.3vw] border-b-2 ${isActive
                  ? "border-red-500"
                  : "border-transparent opacity-70"
                  }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
