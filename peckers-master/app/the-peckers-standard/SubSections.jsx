"use client";
import React, { useRef, useEffect, memo, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { urlFor } from "../../sanity/lib/image";

// Optimized individual section component to prevent parent re-renders
const SectionItem = memo(({ section, index, num, total }) => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollableRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Dynamic object position for mobile: Section 4 needs to be centered to show all persons
  const mobileObjectPosition = num === 4 ? "object-center" : "object-[80%_50%]";

  // Only apply data-lenis-prevent when content actually overflows to avoid scroll dead zones
  useEffect(() => {
    const el = scrollableRef.current;
    if (!el) return;
    const updateLenisPrevent = () => {
      if (el.scrollHeight > el.clientHeight) {
        el.setAttribute("data-lenis-prevent", "");
      } else {
        el.removeAttribute("data-lenis-prevent");
      }
    };
    updateLenisPrevent();
    const ro = new ResizeObserver(updateLenisPrevent);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // More optimized intersection detection - smaller margin to prevent excessive early loading
  const isInView = useInView(sectionRef, { margin: "150px 0px", once: true });
  // Specifically for video playback - more lenient threshold for iPads
  const isStrictlyInView = useInView(sectionRef, { amount: 0.15 });

  // Handle video loading and playback with proper error handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    if (isStrictlyInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video playback prevented:", error);
        });
      }
    } else {
      video.pause();
    }
  }, [isStrictlyInView, videoError]);

  // Handle video load and error events
  const handleVideoLoadedMetadata = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    setVideoError(true);
  };

  const isAlternate = index % 2 !== 0;

  // Media aspect ratio
  const imageAspectRatio =
    section.image?.asset?.metadata?.dimensions?.aspectRatio || 1.777;
  const videoAspectRatio = 1.777;
  const activeAspectRatio =
    section.videoUrl || section.video ? videoAspectRatio : imageAspectRatio;

  return (
    <section
      ref={sectionRef}
      className={`w-full h-auto md:h-[480px] lg:min-h-[75vh] flex flex-col ${isAlternate ? "md:flex-row-reverse" : "md:flex-row"
        } bg-black overflow-hidden relative shadow-inner`}
    >
      {/* MEDIA SECTION */}
      <div
        className="w-full md:w-[50%] lg:w-[60%] h-[330px] md:h-auto shadow-2xl flex-shrink-0 relative overflow-hidden bg-black flex items-center justify-center z-10"
      >
        {/* Media Content - Rendered directly to avoid "placeholder flip" issues on Safari */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
          {section.videoUrl || section.video ? (
            // VIDEO SECTION
            !videoError ? (
              <video
                ref={videoRef}
                src={
                  section.videoUrl ||
                  (section.video?.asset?._ref
                    ? urlFor(section.video).url()
                    : "")
                }
                poster={section.image ? urlFor(section.image).width(800).format("webp").url() : undefined}
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload"
                preload={index < 3 ? "auto" : "metadata"}
                crossOrigin="anonymous"
                decoding="async"
                className="w-full h-full object-cover"
                onLoadedMetadata={handleVideoLoadedMetadata}
                onError={handleVideoError}
                onCanPlay={() => setVideoLoaded(true)}
                style={{
                  filter: "brightness(0.9)",
                  opacity: isInView && !videoError ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out"
                }}
              />
            ) : (
              // Fallback to image if video fails to load
              section.image && (
                <div className="w-full h-full relative" style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}>
                  <Image
                    src={urlFor(section.image)
                      .width(1500)
                      .format("webp")
                      .url()}
                    alt={section.title || `Section ${num} - Fallback`}
                    fill
                    className={`object-cover ${mobileObjectPosition} md:object-[80%_50%]`}
                    style={{ filter: "brightness(0.7)" }}
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              )
            )
          ) : (
            // PHOTO SECTION
            section.image && (
              <div className="w-full h-full relative" style={{ opacity: isInView ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}>
                <Image
                  src={urlFor(section.image)
                    .width(1500)
                    .format("webp")
                    .url()}
                  alt={section.title || `Section ${num}`}
                  fill
                  className={`object-cover ${mobileObjectPosition} md:object-[80%_50%]`}
                  style={{ filter: "brightness(0.7)" }}
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            )
          )}
        </div>

        {/* Dynamic loading state for slow connections */}
        <div className={`absolute inset-0 bg-[#0a0a0a] transition-opacity duration-1000 z-10 ${isInView && (videoLoaded || !(section.videoUrl || section.video)) ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      {/* CONTENT SECTION */}
      <div
        className={`w-full md:w-[50%] lg:w-[40%] h-auto md:h-full text-white flex flex-col overflow-hidden z-20`}
        style={{
          backgroundColor: index % 2 === 0 ? "#111111" : "#000000",
        }}
      >
        <div
          className={`w-full h-full flex flex-col px-[6vw] md:px-[5vw] leading-normal pt-[2vw] pb-[4vw] sm:py-[6vw] md:py-[2vw]`}
        >
          {/* PERSISTENT HEADER */}
          <div className="flex flex-col justify-end mb-[1.5vw] md:mb-[2vw] pt-[2vw] md:pt-[2vw]">
            <div className="w-full flex justify-start items-end min-h-[5vw] md:min-h-[0.1vw]">
              <h2 className="font-peakers font-bold leading-none uppercase tracking-tight text-white text-[9vw] md:text-[44px] lg:text-[48px] xl:text-[50.4px]">
                {section.title}
              </h2>
            </div>
          </div>

          {/* SCROLLABLE TEXT CONTENT */}
          <div
            ref={scrollableRef}
            className="w-full flex-1 overflow-y-auto custom-scrollbar pr-[2vw] max-h-[60vw] md:max-h-[260px] lg:max-h-none md:min-h-0"
          >
            <div className="max-w-[90vw] md:max-w-full pb-[2vw]">
              <p className="text-[#9CA3AF] font-bold w-full text-[3.8vw] leading-[5.5vw] md:text-[18px] md:leading-[28px] lg:text-[20px] lg:leading-[32px] xl:text-[1.1vw] xl:leading-[1.8vw] font-sans mb-[2vw] md:mb-[1vw]">
                {section.previewText}
              </p>

              {section.expandedText && (
                <p className="text-[#9CA3AF] font-bold w-full text-[3.8vw] leading-[5.5vw] md:text-[18px] md:leading-[28px] lg:text-[20px] lg:leading-[32px] xl:text-[1.1vw] xl:leading-[1.8vw] font-sans">
                  {section.expandedText}
                </p>
              )}
            </div>
          </div>

          {/* PERSISTENT FOOTER - Border only */}
          <div className="mt-auto">
            <div className="w-full md:w-[20.8vw] h-px md:h-[0.04vw] relative bg-gray-600 mt-[4vw] md:mt-[1.5vw] mb-[1vw] md:mb-[0.5vw]" />
            {section.title
              ?.toUpperCase()
              .includes("NOTHING COMES OUT OF A BOTTLE") && (
                <a
                  href="/house-made-sauces"
                  className="inline-flex items-center gap-[2vw] md:gap-[10px] px-[6vw] md:px-[20px] py-[2.2vw] md:py-[8px] rounded-full border border-white/30 hover:border-white hover:bg-white/5 hover:text-white transition-all duration-300 text-[3.2vw] md:text-[12px] lg:text-[0.85vw] font-bold uppercase tracking-widest mt-[4vw] md:mt-[1.2vw] group"
                >
                  <span>Explore our house-made sauces</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[2.8vw] h-[2.8vw] md:w-[0.7vw] md:h-[0.7vw] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  >
                    <path
                      d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
          </div>
        </div>
      </div>
    </section>
  );
});

// Helper for icons to keep SectionItem clean
const renderIcon = (index) => {
  switch (index) {
    case 0:
      return (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M6 7C5.17157 7 4.5 7.67157 4.5 8.5C4.5 9.32843 5.17157 10 6 10C6.82843 10 7.5 9.32843 7.5 8.5C7.5 7.67157 6.82843 7 6 7Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5H2C0.89543 5 0 5.89543 0 7V12C0 13.1046 0.89543 14 2 14H10C11.1046 14 12 13.1046 12 12V7C12 5.89543 11.1046 5 10 5H9V4C9 2.34315 7.65685 1 6 1C4.34315 1 3 2.34315 3 4V5ZM4.5 4V5H7.5V4C7.5 3.17157 6.82843 2.5 6 2.5C5.17157 2.5 4.5 3.17157 4.5 4Z"
            fill="white"
          />
        </svg>
      );
    case 1:
      return (
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
          <path
            d="M7 12L6.025 11.085C2.45 7.76625 0 5.4825 0 2.7C0 1.185 1.155 0 2.625 0C3.4125 0 4.165 0.375 4.6375 0.9675L7 3.735L9.3625 0.9675C9.835 0.375 10.5875 0 11.375 0C12.845 0 14 1.185 14 2.7C14 5.4825 11.55 7.76625 7.975 11.085L7 12Z"
            fill="white"
          />
        </svg>
      );
    case 2:
      return (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M6.516 0.364C6.41 -0.056 5.59 -0.056 5.484 0.364C5.071 1.995 4.025 2.87 3.018 3.725C2.062 4.538 1.181 5.286 1.181 6.825C1.181 9.475 3.325 11.625 6 11.625C8.675 11.625 10.819 9.475 10.819 6.825C10.819 5.286 9.938 4.538 8.982 3.725C7.975 2.87 6.929 1.995 6.516 0.364ZM6 10.312C5.068 10.312 4.312 9.556 4.312 8.625C4.312 8.356 4.375 8.1 4.49 7.87C4.694 7.46 5.12 7.18 6 6.82V6.825C6.88 7.185 7.306 7.465 7.51 7.875C7.625 8.105 7.688 8.361 7.688 8.63C7.688 9.563 6.931 10.312 6 10.312Z"
            fill="white"
          />
        </svg>
      );
    case 3:
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM5.25 3H6.75V6.375L9.18723 7.81735L8.43777 9.08265L5.25 7.2V3Z"
            fill="white"
          />
        </svg>
      );
    case 4:
      return (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M6 0L0 2.25V6.825C0 8.725 0.565625 10.4531 1.69687 12.0094C2.82812 13.5656 4.2625 14.5625 6 15V13.425C4.7 13.0125 3.625 12.1875 2.775 10.95C1.925 9.7125 1.5 8.3375 1.5 6.825V3.28125L6 1.59375L10.5 3.28125V6.825C10.5 8.3375 10.075 9.7125 9.225 10.95C8.375 12.1875 7.3 13.0125 6 13.425V15C7.7375 14.5625 9.17188 13.5656 10.3031 12.0094C11.4344 10.4531 12 8.725 12 6.825V2.25L6 0ZM5.2125 10.1625L9.45 5.925L8.38125 4.85625L5.2125 8.025L3.6375 6.45L2.56875 7.51875L5.2125 10.1625Z"
            fill="white"
          />
        </svg>
      );
    case 5:
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 22C2 22 10 18 12 12C12 12 14 16 22 18M12 12C12 12 16 10 18 2C18 2 14 6 12 12ZM12 12C12 12 8 10 6 2C6 2 10 6 12 12Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 6:
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
            fill="white"
          />
        </svg>
      );
    case 7:
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 17C22 19.7614 17.5228 22 12 22C6.47715 22 2 19.7614 2 17H22Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 2L22 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 8:
      return (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M10 3H2L3 14H9L10 3Z" fill="white" />
          <path
            d="M11 0L7 3M1 0H11"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

const SubSections = ({ initialData = [] }) => {
  const sectionsData = initialData || [];

  if (!sectionsData || sectionsData.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      {sectionsData.map((section, index) => (
        <SectionItem
          key={index}
          section={section}
          index={index}
          num={index + 1}
          total={sectionsData.length}
        />
      ))}
    </div>
  );
};

export default SubSections;
