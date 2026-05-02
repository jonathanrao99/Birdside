"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

const Footer = ({ preloadedData = null }) => {
  const [data, setData] = useState(preloadedData);
  const [loading, setLoading] = useState(!preloadedData);

  useEffect(() => {
    if (data) return; // Skip if already loaded

    const fetchFooter = async () => {
      try {
        const footerData = await client.fetch(`*[_type == "footer"][0] {
                    logo,
                    tagline,
                    socialLinks,
                    quickLinks,
                    locations,
                    legalLinks,
                    copyright,
                    bottomLogo
                }`);
        setData(footerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching footer data:", error);
        setLoading(false);
      }
    };
    fetchFooter();
  }, [data]);

  if (loading) return <div className="w-full bg-black h-40 animate-pulse" />;
  if (!data) return null;

  const socialButtons = [
    {
      label: "Instagram",
      url: data.socialLinks?.instagram || "#",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      url: data.socialLinks?.linkedin || data.socialLinks?.facebook || "#",
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      url: data.socialLinks?.twitter || "#",
      svg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
        </svg>
      ),
    },
  ];

  const logoUrl = data.logo ? urlFor(data.logo).url() : null;


  const resolveFooterHref = (url, title = "") => {
    const raw = (url || "").trim();
    const normalizedTitle = title.trim().toLowerCase();

    if (raw && raw !== "#" && !raw.startsWith("#")) {
      if (raw === "/locations") return "/hitchin";
      return raw;
    }

    if (normalizedTitle.includes("menu")) return "/menu";
    if (
      normalizedTitle.includes("find us") ||
      normalizedTitle.includes("location")
    )
      return "/hitchin";
    if (
      normalizedTitle.includes("secret") ||
      normalizedTitle.includes("standard")
    )
      return "/the-peckers-standard";
    if (
      normalizedTitle.includes("journey") ||
      normalizedTitle.includes("story")
    )
      return "/the-journey";
    if (normalizedTitle.includes("careers")) return "/careers";
    if (normalizedTitle.includes("hitchin")) return "/hitchin";
    if (normalizedTitle.includes("stevenage")) return "/stevenage";
    if (normalizedTitle.includes("privacy")) return "/privacy";
    if (normalizedTitle.includes("terms")) return "/terms";
    if (normalizedTitle.includes("allergen")) return "/menu/allergens";
    if (normalizedTitle.includes("faq")) return "/faq";

    return "/home";
  };

  return (
    <footer className="w-full bg-black pt-[10vw] md:pt-[6vw] lg:pt-[3vw] xl:pt-[3vw] pb-[6vw] md:pb-[4vw] lg:pb-[2vw] xl:pb-[1vw] mt-[5vw] md:mt-[4vw] xl:mt-[3vw] overflow-clip">
      <div className="w-full mx-auto px-[5vw] md:px-[5vw] lg:px-[4vw] xl:px-[4vw] gap-[8vw] md:gap-[4vw] lg:gap-[2vw] flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between items-start text-white border-b border-[#262626] pb-[10vw] md:pb-[8vw] lg:pb-[5vw]">
        {/* Left Section */}
        <div className="flex flex-col items-start w-full md:w-[45%] lg:w-1/4 mb-[6vw] lg:mb-0">
          {/* ── MOBILE: logo → tagline → social SVGs (left-aligned) ── */}
          <div className="flex md:hidden flex-col items-start justify-start ml-[-1vw] w-full mb-[5vw] gap-[3vw]">
            {/* Logo (mobile, left-aligned, not circular) */}
            <div className="relative w-[40vw] h-20">
              <Image
                src="/Peckers Logo 1 [Vectorized].svg"
                alt="Peckers Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            {/* Single-line tagline */}
            <p
              className="text-[#E3E3E3] font-mono text-[3.5vw] leading-snug text-left"
              style={{ letterSpacing: "0.09em", fontWeight: "300" }}
            >
              {data.tagline || "Seriously good chicken."}
            </p>
          </div>

          {/* ── DESKTOP (md+): original full-size logo + multi-line text ── */}
          <div className="hidden md:flex items-center mb-[3vw] lg:mb-[2vw] xl:mb-0 relative md:w-[35vw] lg:w-[20vw] xl:w-[16vw] h-24 -ml-[1.5vw] lg:-ml-[1vw] xl:-ml-[0.8vw]">
            <Image
              src="/Peckers Logo 1 [Vectorized].svg"
              alt="Peckers Logo"
              fill
              className="object-contain object-left md:mr-3"
            />
          </div>
          <p
            className="hidden md:block text-[#E3E3E3] font-mono mb-[4vw] lg:mb-[2vw] xl:mb-[1.3vw] leading-snug md:text-[2.5vw] lg:text-[1.4vw] xl:text-[1vw] text-left w-full whitespace-pre-line"
            style={{ letterSpacing: "0.09em", fontWeight: "300" }}
          >
            {data.tagline || "Seriously good chicken."}
          </p>

          {/* Social buttons (unchanged for both breakpoints) */}
          <div className="flex space-x-[4vw] md:space-x-[3vw] lg:space-x-[1.5vw] xl:space-x-3 w-full justify-start md:justify-start mt-1 px-0">
            {socialButtons.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[10vw] h-[10vw] md:w-[8vw] md:h-[8vw] lg:w-[4.5vw] lg:h-[4.5vw] xl:w-11 xl:h-11 bg-[#161616] flex items-center justify-center rounded-[2vw] md:rounded-[1.5vw] lg:rounded-[1vw] xl:rounded-[0.5vw] transition-all duration-200 hover:scale-110 hover:bg-[#232323] hover:shadow-[0_4px_28px_0_rgba(196,23,24,0.12)]"
                aria-label={social.label}
              >
                <div className="scale-[1.2] md:scale-100 flex items-center justify-center w-full h-full">
                  {social.svg}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links + Locations: side-by-side on mobile, normal on desktop */}
        <div className="flex flex-row gap-[5vw] w-full md:contents">
          {/* Quick Links */}
          <div className="flex flex-col w-1/2 md:w-[45%] lg:w-1/4 mt-[4vw] md:mt-0 xl:mt-[1.6vw] mb-[6vw] lg:mb-0 items-start md:items-start text-left md:text-left">
            <h3
              className="font-bold text-white text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[1.8vw] xl:text-[1.2vw] uppercase tracking-wide mb-[3vw] md:mb-[2vw] lg:mb-[1.5vw] xl:mb-[1vw] leading-none"
              style={{
                letterSpacing: "0.06em",
                fontFamily: "var(--font-peakers-bold)",
              }}
            >
              <span>Quick Links</span>
            </h3>
            <div className="bg-[#333] mt-0 mb-[4vw] md:mb-[3vw] lg:mb-[2.5vw] xl:mb-[1.8vw] w-full md:w-[60%] lg:w-[40%] xl:w-[35%] md:max-w-none lg:max-w-[160px] xl:max-w-[140px] h-[2px] md:h-[1.5px] lg:h-px border-none rounded-lg" />
            <ul className="space-y-[3vw] md:space-y-[2vw] lg:space-y-[1.2vw] xl:space-y-[1vw] text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1vw] font-normal text-[#a9adb8] w-full">
              {data.quickLinks?.length > 0 ? (
                data.quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={resolveFooterHref(link.url, link.title)}
                      className="hover:underline inline-block"
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="/menu"
                      className="hover:underline inline-block"
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      Our Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/hitchin"
                      className="hover:underline inline-block"
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      Find Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/the-peckers-standard"
                      className="hover:underline inline-block"
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      Our Secret
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="hover:underline inline-block"
                      style={{ fontFamily: "var(--font-neuzeit)" }}
                    >
                      Careers
                    </Link>
                  </li>
                </>
              )}
              {/* Always show FAQ if not already present in dynamic links */}
              {!data.quickLinks?.some(l => l.title.toLowerCase().includes('faq')) && (
                <li>
                  <Link
                    href="/faq"
                    className="hover:underline inline-block"
                    style={{ fontFamily: "var(--font-neuzeit)" }}
                  >
                    FAQ
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Locations */}
          <div className="flex flex-col w-1/2 md:w-[45%] lg:w-1/4 mb-[6vw] lg:mb-0 mt-[4vw] md:mt-[1.3vw] items-start md:items-start text-left md:text-left">
            <h3
              className="font-bold text-white text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[1.8vw] xl:text-[1.2vw] uppercase tracking-wide mb-[3vw] md:mb-[2vw] lg:mb-[1.5vw] xl:mb-[1vw] leading-none"
              style={{
                letterSpacing: "0.06em",
                fontFamily: "var(--font-peakers-bold)",
              }}
            >
              Locations
            </h3>
            <div className="bg-[#333] mt-0 mb-[4vw] md:mb-[3vw] lg:mb-[2.5vw] xl:mb-[1.8vw] w-full md:w-[60%] lg:w-[40%] xl:w-[35%] md:max-w-none lg:max-w-[160px] xl:max-w-[140px] h-[2px] md:h-[1.5px] lg:h-px border-none rounded-lg" />
            <div
              className="space-y-[3vw] md:space-y-[2vw] lg:space-y-[1.2vw] xl:space-y-[1vw] text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1vw] text-[#a9adb8] leading-snug font-normal w-full"
              style={{ fontFamily: "var(--font-neuzeit)" }}
            >
              {data.locations?.length > 0 ? (
                data.locations
                  .filter((loc) => !loc.toLowerCase().includes("view all"))
                  .map((loc, idx) => (
                    <div key={idx}>
                      <Link
                        href={resolveFooterHref("#", loc)}
                        className="hover:underline inline-block"
                      >
                        {loc.replace(/HItchin/g, "Hitchin")}
                      </Link>
                    </div>
                  ))
              ) : (
                <>
                  <div>
                    <Link
                      href="/hitchin"
                      className="hover:underline inline-block"
                    >
                      Hitchin
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/stevenage"
                      className="hover:underline inline-block"
                    >
                      Stevenage
                    </Link>
                  </div>
                </>
              )}
              <div>
                {/* <Link
                  href="/hitchin"
                  className="underline decoration-[#C41718] decoration-1 underline-offset-[1vw] md:underline-offset-4 lg:underline-offset-2 text-[#C41718] hover:text-[#f22] transition-colors inline-block mt-[1vw] md:mt-[2vw] lg:mt-0"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                >
                  View All Locations
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Boring Stuff Column */}
        <div className="flex flex-col w-full md:w-[45%] lg:w-1/4 mb-[6vw] mt-[4vw] md:mt-[1.3vw] lg:mb-0 items-start md:items-start text-left md:text-left">
          {/* Hidden on mobile, shown on desktop */}
          <h3
            className="block font-bold text-white text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[1.8vw] xl:text-[1.2vw] uppercase tracking-wide mb-[3vw] md:mb-[2vw] lg:mb-[1.5vw] xl:mb-[1vw] leading-none"
            style={{
              letterSpacing: "0.06em",
              fontFamily: "var(--font-peakers-bold)",
            }}
          >
            Information
          </h3>
          <div className="block bg-[#333] mt-0 mb-[4vw] md:mb-[3vw] lg:mb-[2.5vw] xl:mb-[1.8vw] w-[40vw] md:w-[60%] lg:w-[40%] xl:w-[41%] max-w-[200px] md:max-w-none lg:max-w-[160px] xl:max-w-[140px] h-[2px] md:h-[1.5px] lg:h-px border-none rounded-lg" />
          <ul className="space-y-[4vw] md:space-y-[2vw] lg:space-y-[1.5vw] xl:space-y-[1.2vw] text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1vw] font-mono text-[#B7BAC8] w-full">
            {data.legalLinks?.length > 0 ? (
              data.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={resolveFooterHref(link.url, link.title)}
                    className="hover:underline inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:underline inline-block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline inline-block">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/menu/allergens"
                    className="hover:underline inline-block"
                  >
                    Allergen Info
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full bg-black text-[#586676] text-[10px] md:text-[0.8vw] tracking-tight font-mono px-[5vw] py-6 md:px-[5vw] md:py-[2.5vw] lg:px-[4vw] xl:px-[4vw] flex flex-col md:flex-row justify-between items-center border-t border-[#151515] gap-3 md:gap-0">
        <div className="mb-1 md:mb-0 text-center md:text-left">
          {(data.copyright?.includes("Designed and Developed By")
            ? data.copyright.split("Designed and Developed By")[0].trim()
            : data.copyright ||
            "© 2026 Peckers Chicken Ltd. All rights reserved. Do not steal our sauce recipe."
          ).replace(/©\s*20(2[0-5])/, "© 2026")}
        </div>


      </div>

      {/* Brand Bottom Logo */}

      <div className="flex-1 flex items-center">
        <div className="w-full flex justify-center items-center py-2 md:py-4 bg-black">
          <div className="relative max-w-[100%] w-full h-80 md:h-[45vw] lg:h-[35vw] xl:h-[28vw]">
            <Image
              src="/Peckers Logo 1 [Vectorized].svg"
              alt="Peckers Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
