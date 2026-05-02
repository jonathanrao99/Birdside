"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { urlFor } from "../../sanity/lib/image";
import CoopHeading from "./CoopHeading";
import CoopImages from "./CoopImages";

const LatestNewsHeading = dynamic(() => import("./LatestNewsHeading"), {
  ssr: true,
});
const LatestNewsCards = dynamic(() => import("./LatestNewsCards"), {
  ssr: true,
});
const CaptionBelowNews = dynamic(() => import("./CaptionBelowNews"), {
  ssr: true,
});
const PersonDetails = dynamic(() => import("./PersonDetails"), { ssr: true });
const SignUpSection = dynamic(() => import("./SignUpSection"), { ssr: true });
import GoogleReviews from "../components/GoogleReviews";

const HomePageClient = ({
  initialHomepageData,
  initialSliderCards,
  initialLocations,
  initialPersonDetails,
  initialReviews,
}) => {
  const [data, setData] = useState(initialHomepageData || {});
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted and other attributes to ensure autoplay works on mobile
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.setAttribute("playsinline", "");
      videoRef.current.setAttribute("webkit-playsinline", "");
      videoRef.current.loop = true;

      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay prevented recorded:", error);
          // If autoplay failed, try again on first user interaction
          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log("Still blocked", e));
              window.removeEventListener("touchstart", handleFirstInteraction);
              window.removeEventListener("mousedown", handleFirstInteraction);
            }
          };
          window.addEventListener("touchstart", handleFirstInteraction);
          window.addEventListener("mousedown", handleFirstInteraction);
        }
      };

      playVideo();
    }
  }, [data?.videoUrl]);

  const getCaption = () => {
    const card = initialSliderCards[activeCardIndex];
    if (!card) return data?.journalCaption;

    // Prioritize the caption from Sanity if it exists
    if (card.caption) {
      return card.caption;
    }

    const title = card.title?.toLowerCase() || "";
    if (title.includes("health box")) {
      return "Meet the all-new Peckers Health Box: seriously good chicken, spicy rice, grilled halloumi, and fresh salad in one balanced feast.";
    }
    if (title.includes("marinade") || title.includes("sauce")) {
      return "New flavour alert: Our grilled chicken just got an upgrade with our all-new signature marinade range.";
    }
    if (title.includes("jerk")) {
      return "The wait is over: Authentic, flame-grilled Jerk Chicken has officially landed at Peckers.";
    }

    return (
      data?.journalCaption ||
      "Stay up to date with our shenanigans, limited drops, and questionable life choices."
    );
  };

  useEffect(() => {
    // Failsafe: if video hasn't revealed within 1.5 seconds but we have a URL, show it anyway
    // This is much better now because the backdrop image is already visible.
    const timer = setTimeout(() => {
      if (!videoLoaded && data?.videoUrl) {
        setVideoLoaded(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [videoLoaded, data?.videoUrl]);

  return (
    <div id="main-content">
      <section className="hero w-full h-[80vh] xl:h-screen bg-black flex items-center justify-center lg:justify-start overflow-hidden relative">
        {data?.videoUrl && (
          <>
            {/* 
                IMMEDIATE BACKDROP POSTER 
                This ensures the "Seriously Good Chicken" text always has a high-quality 
                background immediately after the page preloader, solving the "blank page" glitch.
            */}
            {data.heroPoster && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={urlFor(data.heroPoster).width(1920).quality(75).auto("format").url()}
                  alt="Peckers Hero backdrop"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            )}

            <video
              ref={videoRef}
              key={data?.videoUrl}
              src={data?.videoUrl}
              // Keep poster on video tag as well for secondary backup
              poster={data.heroPoster ? urlFor(data.heroPoster).width(1920).quality(75).auto("format").url() : ""}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              disablePictureInPicture
              disableRemotePlayback
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              onCanPlayThrough={() => setVideoLoaded(true)}
              onPlay={() => setVideoLoaded(true)}
              onError={() => {
                console.error("Hero video failed to load");
                setVideoLoaded(true); // Show the poster (from Image component) if video fails
              }}
              className={`absolute inset-0 w-full h-full object-cover object-center z-[1] pointer-events-none transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"
                }`}
            />
            {/* Visual enhancement overlay for better legibility */}
            <div className="absolute inset-0 bg-black/10 z-[2]" />
          </>
        )}
        <div className="relative z-10 w-full px-[5vw] md:px-[7vw] lg:px-[4vw]">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1
              className="text-white font-peakers text-[20vw] md:text-[11vw] lg:text-[10.5vw] leading-[0.9] font-bold tracking-[0.04em]"
              style={{ textShadow: "none" }}
            >
              Seriously <br /> Good <br /> Chicken
            </h1>

            {data.heroSubtitle && (
              <p className="text-white/90 text-[4.5vw] md:text-[2vw] lg:text-[1.5vw] font-sans max-w-[85vw] md:max-w-[40vw] leading-tight">
                {data.heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      <CoopHeading
        heading={data?.locationsHeading}
        subtitle={data?.locationsSubtitle}
      />
      <CoopImages locations={initialLocations} />

      {/* THE PECKERS JOURNAL — full viewport section */}
      <section className="flex flex-col  xl:min-h-screen pt-[8vw] pb-[4vw] md:py-[4vw] xl:py-12">
        <LatestNewsHeading
          heading={data?.journalHeading}
          subtitle={data?.journalSubtitle}
        />
        <div className="md:flex-1 xl:flex-none md:min-h-0">
          <LatestNewsCards
            news={initialSliderCards}
            onActiveIndexChange={setActiveCardIndex}
          />
        </div>
        <CaptionBelowNews caption={getCaption()} />
      </section>

      <PersonDetails data={initialPersonDetails} />

      <GoogleReviews
        initialReviews={initialReviews}
        ratingData={data?.ratingSection}
      />

      <SignUpSection initialData={data?.signupSection} />


    </div>
  );
};

export default HomePageClient;
