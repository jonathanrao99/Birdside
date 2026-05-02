"use client";
import React, { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

export default function RatingSectionCards({ reviews = [] }) {
  if (!reviews || reviews.length === 0) return null;
  const [displayReviews, setDisplayReviews] = useState(reviews);

  useEffect(() => {
    // Only duplicate the reviews on the client-side to keep the initial HTML source clean
    // and avoid bloated DOM during SSR.
    if (reviews && reviews.length > 0) {
      setDisplayReviews([...reviews, ...reviews]);
    }
  }, [reviews]);

  return (
    <div
      className="w-full mt-[6vw] md:mt-[3vw] mb-[2vw] md:mb-[2vw] relative"
    >
      <style>{`
        .rating-marquee {
          display: flex;
          width: max-content;
          animation: rating-scroll 40s linear infinite;
        }
        .rating-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes rating-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Infinite horizontal scroll */}
      <div className="w-full px-[2vw] overflow-hidden">
        <div className="rating-marquee gap-[3vw] lg:gap-[1vw] items-stretch">
          {displayReviews.map((card, index) => {
            const isDuplicate = index >= reviews.length;
            return (
              <div
                key={index}
                aria-hidden={isDuplicate ? "true" : "false"}
                className="w-[80vw] min-w-[80vw] md:w-[45vw] md:min-w-[45vw] lg:w-[30vw] lg:min-w-[30vw] min-h-[28vw] md:min-h-[16vw] lg:min-h-[12vw] h-auto bg-[#181818] rounded-[4vw] md:rounded-[2vw] lg:rounded-[1vw] p-[5vw] md:p-[3vw] lg:p-[2vw] flex flex-col shadow-lg border border-[#1F2937] relative shrink-0"
              >
                <div className="flex flex-row items-center justify-between mb-[3vw] lg:mb-[0.8vw]">
                  <div className="flex flex-row items-center gap-[3vw] lg:gap-[0.8vw]">
                    <div
                      className={`w-[12vw] h-[12vw] min-w-[12vw] min-h-[12vw] md:w-[6vw] md:h-[6vw] md:min-w-[6vw] md:min-h-[6vw] lg:w-[2.7vw] lg:h-[2.7vw] lg:min-w-[2.7vw] lg:min-h-[2.7vw] rounded-full bg-linear-to-br ${card.gradient || "from-gray-400 to-gray-600"} flex items-center justify-center text-white font-bold uppercase font-sans shadow-md overflow-hidden`}
                    >
                      {card.image ? (
                        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{card.name?.[0]}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className="text-white font-extralight text-[4vw] md:text-[2vw] lg:text-[1.3vw] leading-[1.2] uppercase tracking-[2px]"
                        style={{ fontFamily: "var(--font-peakers)" }}
                      >
                        {card.name}
                      </h3>
                      <span
                        className="text-[#A1A1AA] font-mono text-[3vw] md:text-[1.5vw] lg:text-[1vw] leading-tight mt-0"
                        style={{ fontWeight: 400, letterSpacing: "0.01em" }}
                      >
                        {card.role}
                      </span>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 41 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[8vw] h-[7vw] md:w-[5vw] md:h-[4.5vw] lg:w-[3vw] lg:h-[2.5vw] shrink-0"
                  >
                    <path
                      d="M36.7031 0C38.7598 0 40.5 1.74023 40.5 3.79688V22.7812C40.5 29.8213 34.8047 35.4375 27.8438 35.4375H27.2109C26.1035 35.4375 25.3125 34.6465 25.3125 33.5391V29.7422C25.3125 28.7139 26.1035 27.8438 27.2109 27.8438H27.8438C30.6123 27.8438 32.9062 25.6289 32.9062 22.7812V17.7188H26.5781C24.4424 17.7188 22.7812 16.0576 22.7812 13.9219V3.79688C22.7812 1.74023 24.4424 0 26.5781 0H36.7031ZM13.9219 0C15.9785 0 17.7188 1.74023 17.7188 3.79688V22.7812C17.7188 29.8213 12.0234 35.4375 5.0625 35.4375H4.42969C3.32227 35.4375 2.53125 34.6465 2.53125 33.5391V29.7422C2.53125 28.7139 3.32227 27.8438 4.42969 27.8438H5.0625C7.83105 27.8438 10.125 25.6289 10.125 22.7812V17.7188H3.79688C1.66113 17.7188 0 16.0576 0 13.9219V3.79688C0 1.74023 1.66113 0 3.79688 0H13.9219Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
                <div className="text-[#b3b3b3] text-[3.5vw] md:text-[1.8vw] lg:text-[1vw] font-extralight font-sans mt-[1vw] lg:mt-[0.15vw] leading-normal tracking-wide max-w-full grow">
                  {card.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
