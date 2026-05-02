"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

gsap.registerPlugin(ScrollTrigger);

// Mapping of sauce keywords to their page slugs for deep linking
const SAUCE_MAPPING = [
  { keywords: ["HOUSE - MAYO", "HOUSE MAYO", "HOUSE-MAYO", "HOUSE-MADE MAYO", "MAYONNAISE"], slug: "house-mayonnaise" },
  { keywords: ["SUPERCHARGED OG SAUCE", "SUPERCHARGED OG", "SUPERCHARGED"], slug: "supercharged" },
  { keywords: ["BBQ SAUCE", "BBQ", "HONEY GLAZE BBQ"], slug: "honey-glaze-bbq" },
  { keywords: ["CHEESE SAUCE", "BLUE CHEESE", "CHEESE"], slug: "cheese" },
  { keywords: ["BUFFALO SAUCE", "BUFFALO", "BUFFLO", "BUFFLAO"], slug: "buffalo" },
  { keywords: ["HOT SAUCE BLAZE", "HOT SAUCE"], slug: "hot-sauce" },
  { keywords: ["GARLIC MAYO"], slug: "garlic-mayo" },
  { keywords: ["KOREAN BBQ", "KOREAN GLAZE"], slug: "korean-bbq" },
  { keywords: ["HOT HONEY"], slug: "hot-honey" },
  { keywords: ["BUTTER ME UP SAUCE", "BUTTER ME UP"], slug: "butter-me-up" },
];

export default function BurgerPageText({ burgerData = null }) {
  const containerRef = useRef(null);
  const [settings, setSettings] = useState(null);

  // Utility to find sauce names in text and wrap them in Links
  const renderLinkedText = (text) => {
    if (!text) return null;
    let result = [text];
    
    // Sort mapping by longest keyword first to match specific phrases before generic ones
    const sortedSauces = [...SAUCE_MAPPING].sort((a, b) => {
      const maxA = Math.max(...a.keywords.map(k => k.length));
      const maxB = Math.max(...b.keywords.map(k => k.length));
      return maxB - maxA;
    });

    sortedSauces.forEach(sauce => {
      const nextResult = [];
      result.forEach(part => {
        if (typeof part !== "string") {
          nextResult.push(part);
          return;
        }
        const pattern = new RegExp(`(${sauce.keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})`, "gi");
        const subParts = part.split(pattern);
        subParts.forEach((sub, idx) => {
          if (sauce.keywords.some(k => k.toUpperCase() === sub.toUpperCase())) {
            nextResult.push(
              <Link
                key={`${sub}-${idx}`}
                href={`/house-made-sauces?sauce=${sauce.slug}`}
                className="hover:text-[#F2DF0D] transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-[#F2DF0D]"
              >
                {sub}
              </Link>
            );
          } else {
            nextResult.push(sub);
          }
        });
      });
      result = nextResult;
    });
    return result;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const siteSettings = await client.fetch(`*[_type == "siteSettings"][0] { clickCollectUrl, deliveryUrl }`);
        if (siteSettings) setSettings(siteSettings);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  useLayoutEffect(() => {
    if (!burgerData) return;

    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray([
        ".burger-subtitle",
        ".burger-btn-cc",
        ".burger-btn-delivery",
        ".burger-stats",
        ".burger-available",
      ]);
      gsap.fromTo(
        texts,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [burgerData]);

  if (!burgerData) return null;

  const renderSpiceLevel = () => {
    const bars = [];
    const levelStr = burgerData.spiceLevel || "0/4";
    let level = 0;

    if (typeof levelStr === "string" && levelStr.includes("/")) {
      level = parseInt(levelStr.split("/")[0]);
    } else if (typeof levelStr === "number") {
      level = levelStr;
    } else if (levelStr === "Depends") {
      level = 1;
    }

    for (let i = 0; i < 4; i++) {
      bars.push(
        <svg
          key={i}
          width="17"
          height="10"
          viewBox="0 0 17 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="17"
            height="9"
            rx="2.5"
            fill={i < level ? "#F2DF0D" : "white"}
            fillOpacity={i < level ? "1" : "0.2"}
          />
        </svg>
      );
    }
    return bars;
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center mt-0 mb-8 relative bg-black pt-10"
    >
      {/* Subtitle/Ingredients */}
      <div className="flex items-center mt-1 gap-[2vw] md:gap-[0.85vw] pt-0.5 burger-subtitle">
        <svg
          className="w-[3.5vw] h-[3.5vw] md:w-[20px] md:h-[20px] min-w-[12px] min-h-[12px]"
          viewBox="0 0 10 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16667 6.41667C1.16667 6.92222 1.26875 7.40104 1.47292 7.85313C1.67708 8.30521 1.96875 8.70139 2.34792 9.04167C2.33819 8.99306 2.33333 8.94931 2.33333 8.91042C2.33333 8.87153 2.33333 8.82778 2.33333 8.77917C2.33333 8.46805 2.39167 8.17639 2.50833 7.90417C2.625 7.63194 2.79514 7.38403 3.01875 7.16042L4.66667 5.54167L6.31458 7.16042C6.53819 7.38403 6.70833 7.63194 6.825 7.90417C6.94167 8.17639 7 8.46805 7 8.77917C7 8.82778 7 8.87153 7 8.91042C7 8.94931 6.99514 8.99306 6.98542 9.04167C7.36458 8.70139 7.65625 8.30521 7.86042 7.85313C8.06458 7.40104 8.16667 6.92222 8.16667 6.41667C8.16667 5.93056 8.07674 5.47118 7.89687 5.03854C7.71701 4.6059 7.45694 4.21944 7.11667 3.87917C6.92222 4.00556 6.71806 4.10035 6.50417 4.16354C6.29028 4.22674 6.07153 4.25833 5.84792 4.25833C5.24514 4.25833 4.72257 4.05903 4.28021 3.66042C3.83785 3.26181 3.58264 2.77083 3.51458 2.1875C3.13542 2.50833 2.8 2.84132 2.50833 3.18646C2.21667 3.5316 1.97118 3.8816 1.77188 4.23646C1.57257 4.59132 1.42188 4.95347 1.31979 5.32292C1.21771 5.69236 1.16667 6.05694 1.16667 6.41667ZM4.66667 7.175L3.83542 7.99167C3.72847 8.09861 3.64583 8.22014 3.5875 8.35625C3.52917 8.49236 3.5 8.63333 3.5 8.77917C3.5 9.09028 3.61424 9.35764 3.84271 9.58125C4.07118 9.80486 4.34583 9.91667 4.66667 9.91667C4.9875 9.91667 5.26215 9.80486 5.49062 9.58125C5.7191 9.35764 5.83333 9.09028 5.83333 8.77917C5.83333 8.62361 5.80417 8.48021 5.74583 8.34896C5.6875 8.21771 5.60486 8.09861 5.49792 7.99167L4.66667 7.175ZM4.66667 0V1.925C4.66667 2.25556 4.7809 2.53264 5.00938 2.75625C5.23785 2.97986 5.51736 3.09167 5.84792 3.09167C6.02292 3.09167 6.18576 3.05521 6.33646 2.98229C6.48715 2.90937 6.62083 2.8 6.7375 2.65417L7 2.33333C7.71944 2.74167 8.28819 3.31042 8.70625 4.03958C9.12431 4.76875 9.33333 5.56111 9.33333 6.41667C9.33333 7.71944 8.88125 8.82292 7.97708 9.72708C7.07292 10.6312 5.96944 11.0833 4.66667 11.0833C3.36389 11.0833 2.26042 10.6312 1.35625 9.72708C0.452083 8.82292 0 7.71944 0 6.41667C0 5.1625 0.420486 3.97153 1.26146 2.84375C2.10243 1.71597 3.2375 0.768056 4.66667 0Z"
            fill="#F2DF0D"
          />
        </svg>
        <span
          className="text-[3.2vw] md:text-[16px] lg:text-[18px] xl:text-[1.5vw] text-white/80 font-peakers uppercase tracking-wide"
          style={{
            paddingTop: "0.1em",
            display: "inline-block",
          }}
        >
          {renderLinkedText(burgerData.ingredients || "HOT SAUCE BLAZE / BLUE CHEESE / CELERY SLAW")}
        </span>
      </div>
      <div className="flex gap-[3vw] md:gap-3 mt-[4vw] md:mt-5.5">
        <a
          href="https://peckers.vmos.io/store/store-selection?app=online"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-[3vw] py-[1.5vw] md:px-6 md:py-2 rounded-[.4vw] border-[1.5px] md:border-2 xl:border-[0.11vw] border-[#f2df0d] text-[#ffff] font-mono uppercase tracking-wide text-[2.2vw] md:text-[14px] lg:text-[16px] xl:text-[1vw] cursor-pointer hover:bg-[#f2df0d]/10 transition-colors duration-150 burger-btn-cc no-underline"
          style={{
            minWidth: 90,
            letterSpacing: "0.04em",
            paddingTop: "0.45em",
            paddingBottom: "0.45em",
          }}
        >
          Click &amp; Collect
        </a>
        <a
          href="https://peckers.vmos.io/store/store-selection?app=delivery"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-[3.5vw] py-[1.5vw] md:px-7 md:py-2 rounded border-[1.5px] md:border-2 xl:border-[0.11vw] border-[#f2df0d] text-[#ffff] font-mono uppercase tracking-wide text-[2.2vw] md:text-[14px] lg:text-[16px] xl:text-[1vw] cursor-pointer hover:bg-[#f2df0d]/10 transition-colors duration-150 burger-btn-delivery no-underline"
          style={{
            minWidth: 90,
            letterSpacing: "0.04em",
            paddingTop: "0.45em",
            paddingBottom: "0.45em",
          }}
        >
          Delivery
          <svg
            width="18"
            height="18"
            className="ml-1.5"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M6 15L13 8L6 1"
                stroke="#F2DF0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </a>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-[6vw] md:gap-8 lg:gap-12 xl:gap-[10vw] mt-[8vw] md:mt-7 ml-0 md:ml-6 text-white/90 font-mono pt-0 burger-stats px-[5vw] md:px-0">

        {/* Basic Info (Calories, Protein, Carbs, Fats) */}
        <div className="min-w-[150px] border-l-2 border-[#616132] pl-[3vw] md:pl-4 pt-0">
          <div className="text-[#c4b40a] text-[2.5vw] md:text-[11px] lg:text-[12px] xl:text-[.7vw] font-mono uppercase mb-1 tracking-wide font-bold pt-0.5">
            Nutrition (Per Burger)
          </div>
          <div className="font-sans font-semibold text-[3.8vw] md:text-[0.95rem] tracking-tight pt-0 leading-snug">
            {burgerData.calories
              ? (burgerData.calories.toLowerCase().includes("kcal") ? burgerData.calories : `${burgerData.calories} kcal`)
              : "760 kcal"}<br />
            {burgerData.protein || "18g Protein"}<br />
            {burgerData.carbs || "22g Carbs"}<br />
            {burgerData.fats || "12g Fats"}
          </div>
        </div>

        {/* Allergens */}
        <div className="min-w-[105px] pt-0 border-l-2 md:border-none border-[#616132] pl-[3vw] md:pl-0">
          <div className="text-[#575750] text-[2.5vw] md:text-[11px] lg:text-[12px] xl:text-[.7vw] font-mono uppercase mb-1 tracking-wide font-bold pt-0.5">
            Allergens
          </div>
          <div className="font-sans font-semibold text-[3.8vw] md:text-[0.95rem] tracking-tight pt-0">
            {burgerData.allergens || "GLUTEN, DAIRY"}
          </div>
        </div>
        {/* Spice Level */}
        <div className="min-w-[105px] pt-0 border-l-2 md:border-none border-[#616132] pl-[3vw] md:pl-0">
          <div className="text-[#c4b40a] uppercase mb-1 text-[2.5vw] md:text-[12px] lg:text-[14px] xl:text-[.8vw] tracking-wide font-bold pt-0.5">
            Spice Level
          </div>
          <div className="flex items-center gap-1.5 mt-1 h-[1.1em] pt-0">
            {renderSpiceLevel()}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center pt-[8vw] md:pt-5 pb-[15vw] md:pb-[5vw] burger-available text-center px-[5vw]">
        <span className="text-white font-peakers text-[4vw] md:text-[20px] lg:text-[24px] xl:text-[2.2vw] tracking-3 font-normal">
          {burgerData.availabilityText || "Also available as a wrap, rice bowl and salad bowl."}
        </span>
      </div>
      <div className="w-full flex justify-center pb-[4vw] md:pb-5 text-center px-[5vw]">
        <span className="text-white font-peakers text-[3.2vw] md:text-[16px] lg:text-[18px] xl:text-[1.8vw] tracking-3 font-normal">
          Can also be made into a veggie option
        </span>
      </div>


    </div>
  );
}
