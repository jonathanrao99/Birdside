"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaStar,
  FaGoogle,
  FaQuoteRight,
  FaChevronRight,
  FaStarHalfAlt,
} from "react-icons/fa";
import { useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const GoogleReviews = ({ initialReviews = [], ratingData = {} }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // We'll always fetch on the client to satisfy referer restrictions
    const fetchReviews = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const placeIds = [
        "ChIJVVweuNo1dkgRi-IfLyhtgyU", // Hitchin
        "ChIJxVydIDgvdkgR3vKTXPIOuYo", // Stevenage
      ];

      if (!apiKey) {
        setError("API Key missing");
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          placeIds.map(async (placeId) => {
            const url = `https://places.googleapis.com/v1/places/${placeId}`;
            const response = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask":
                  "reviews,rating,userRatingCount,displayName",
              },
            });
            const data = await response.json();
            const reviews = data.reviews || [];
            const locationName = data.displayName?.text || "";

            return reviews.map((review) => ({
              ...review,
              locationName,
              placeId,
            }));
          }),
        );

        const allReviews = results.flat().map((review, index) => ({
          _id: `google-${index}-${review.name?.split("/").pop() || index}`,
          author_name: review.authorAttribution?.displayName || "Anonymous",
          text: review.text?.text || review.originalText?.text || "",
          relative_time_description: review.relativePublishTimeDescription,
          rating: review.rating,
          profile_photo_url: review.authorAttribution?.photoUri,
          locationName: review.locationName,
          placeId: review.placeId, // Ensure this matches the iterator placeId
          time: review.publishTime
            ? new Date(review.publishTime).getTime() / 1000
            : 0,
        }));

        // Sort reviews by time (newest first)
        allReviews.sort((a, b) => b.time - a.time);
        setReviews(allReviews);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black text-white flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return null; // Don't show the section if it fails
  }

  const headingText = "What People Say";
  const words = headingText.split(" ");

  return (
    <section
      className="pt-[4vw] pb-[2vw] md:pt-[2vw] md:pb-[1vw] lg:pt-[4vw] lg:pb-[9vw] xl:pt-[3vw] xl:pb-[5.5vw] bg-black overflow-hidden relative"
      id="reviews"
    >
      <div className="w-full px-[5vw] md:px-[1.4vw] relative z-10">
        <div className="flex flex-col items-start mb-[8vw] md:mb-[2vw] gap-2 md:gap-3">
          <div className="flex flex-col items-start text-left">
            <h2
              className="text-[7.2vw] sm:text-[6.2vw] md:text-[4.8vw] lg:text-[3.3vw] font-bold text-white tracking-[.18vw] uppercase"
              style={{ fontFamily: "var(--font-peakers)" }}
            >
              {ratingData?.heading || "STREET CRED"}
            </h2>

            <div className="flex items-center gap-3 md:gap-4 mt-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-1 md:gap-2"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-500 text-sm md:text-lg"
                    />
                  ))}
                  <FaStarHalfAlt className="text-yellow-500 text-sm md:text-lg" />
                </div>
              </motion.div>

              <motion.p
                className="font-sans font-extralight text-[3.5vw] sm:text-[3vw] md:text-[2.2vw] lg:text-[1.3vw] text-white opacity-90"
                {...fadeUp(0.4)}
              >
                {ratingData?.subheading ||
                  "4.8/5 Rating from 1,000+ Familiar Faces"}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Infinite Reviews Marquee */}
        <div className="relative w-full overflow-hidden">
          <style>{`
            .reviews-marquee {
              display: flex;
              width: max-content;
              animation: reviews-scroll 40s linear infinite;
            }
            .reviews-marquee:hover {
              animation-play-state: paused;
            }
            @keyframes reviews-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div className="reviews-marquee gap-6 pb-6">
            {[...reviews, ...reviews].map((review, index) => (
              <motion.a
                key={index}
                href={`https://search.google.com/local/reviews?placeid=${review.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[300px] min-w-[300px] md:w-[480px] md:min-w-[480px] h-[200px] md:h-[200px] shrink-0 bg-[#111111] p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col gap-3 md:gap-4 snap-start transition-all duration-300 hover:border-white/10 group relative overflow-hidden"
              >
                <div className="flex justify-between items-start relative z-10 w-full">
                  <div className="flex gap-4 items-center">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/10 border border-white/10 text-white font-mono text-base md:text-lg uppercase">
                        {review.author_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-mono font-bold text-sm md:text-base leading-tight uppercase tracking-widest">
                        {review.author_name}
                      </h3>
                      <p className="text-gray-500 text-[10px] md:text-xs font-mono tracking-tight mt-0.5">
                        {review.relative_time_description || "Verified Buyer"}
                      </p>
                    </div>
                  </div>
                  <FaQuoteRight className="text-white/5 text-6xl md:text-7xl absolute top-4 right-4" />
                </div>

                <p className="text-white/80 text-sm md:text-base md:leading-relaxed font-sans font-normal tracking-wide relative z-10 line-clamp-6">
                  "{review.text || "No comment provided."}"
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
