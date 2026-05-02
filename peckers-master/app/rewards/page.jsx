import Link from "next/link";
import React from "react";
import {
  TbUserPlus,
  TbWallet,
  TbReceipt,
  TbLockOpen,
  TbConfetti,
  TbCircleCheck,
  TbNfc,
} from "react-icons/tb";
import CardStack from "./CardStack";
import RewardsRoadmap from "./RewardsRoadmap";

import OrderButtons from "./OrderButtons";

const ChickenHeadIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22v-3" />
    <path d="M12 19a3 3 0 0 0 3-3v-2l1-1V9c0-3.5-2.5-6-5-6h-2c-2.5 0-5 2.5-5 6v4l1 1v2a3 3 0 0 0 3 3z" />
    <path d="M9 22h6" />
    <path d="M10 13h4" />
    <path d="M12 5v2" />
    <path d="M10 3v2" />
    <path d="M14 3v2" />
    <path
      d="M12 15l-2-2h4l-2 2z"
      fill="currentColor"
      className="text-orange-500"
      stroke="none"
    />
    <path d="M12 15v2" stroke="red" strokeWidth="2" />
  </svg>
);

const TierBox = ({ glowColor, borderColor, isSolid = false }) => (
  <div className="relative flex items-center justify-center p-2 md:p-3">
    {glowColor && (
      <div
        className={`absolute inset-0 rounded-2xl ${glowColor} blur-md opacity-40 md:opacity-60`}
      ></div>
    )}
    <div
      className={`relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl ${isSolid ? "border-[3px]" : "border-2 border-dashed"} ${borderColor} bg-[#111] shadow-xl`}
    >
      <ChickenHeadIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
    </div>
  </div>
);

const DashedArrow = ({ direction }) => {
  return (
    <div className="flex items-center justify-center text-white/60">
      {direction === "right" && (
        <div className="flex items-center w-8 md:w-12">
          <div className="w-full border-t-2 border-dashed border-current"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-current transform rotate-45 -ml-2"></div>
        </div>
      )}
      {direction === "left" && (
        <div className="flex items-center w-8 md:w-12">
          <div className="w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-current transform rotate-45 -mr-2 z-10"></div>
          <div className="w-full border-t-2 border-dashed border-current"></div>
        </div>
      )}
      {direction === "down" && (
        <div className="flex flex-col items-center h-8 md:h-12">
          <div className="h-full border-l-2 border-dashed border-current"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-current transform rotate-45 -mt-2"></div>
        </div>
      )}
    </div>
  );
};

import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Peckers Rewards | Free Milkshake on Sign Up",
    description:
      "Join the Peckers Inner Circle and earn Chicken Heads every time you order. Free milkshake on sign up. Unlock free sides, mains, and full meals as you level up.",
    keywords: [
      "Peckers rewards",
      "chicken loyalty program UK",
      "free milkshake Peckers",
      "Peckers Inner Circle",
      "earn rewards chicken",
      "chicken points program Hertfordshire",
      "best chicken loyalty scheme UK",
      "Peckers Chicken Heads",
      "free food chicken Stevenage",
      "free food chicken Hitchin",
    ],
    path: "/rewards",
  });
}

const imgHero =
  "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/REWARDS%20PAGE%20ICONS/Rewards%20page%20hero%20section.webp";
const imgRecruit =
  "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/REWARDS%20PAGE%20ICONS/recruit.png";
const imgBeta =
  "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/REWARDS%20PAGE%20ICONS/We%20Help%20Small%20Businesses%20%287%29%201.png";
const imgGamma =
  "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/REWARDS%20PAGE%20ICONS/We%20Help%20Small%20Businesses%20%288%29%201%20%281%29.png";
const imgAlpha =
  "https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/REWARDS%20PAGE%20ICONS/We%20Help%20Small%20Businesses%20%289%29%201.png";

const imgCheck =
  "https://www.figma.com/api/mcp/asset/48f6f0a2-e590-4f46-aca8-163f8af75702"; // check mark
const imgVector2 =
  "https://www.figma.com/api/mcp/asset/4d5df211-bd65-4aba-a50a-7884e520a12a"; // path
const imgLogoSmall =
  "https://www.figma.com/api/mcp/asset/27eea737-98e9-44cc-8842-00837645fe04";

export default function RewardsPage() {
  const showComingSoon = false;

  if (showComingSoon) {
    return (
      <div className="bg-[#141311] min-h-screen text-white w-full overflow-hidden flex items-center justify-center p-4 xl:p-12 mb-16 lg:mb-32">
        <div className="bg-[#1c1b19] border-[2px] border-[#222] rounded-[27px] w-full relative overflow-hidden py-24 md:py-32 flex flex-col items-center justify-center max-w-7xl mt-20">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[360px] text-white/[0.03] whitespace-nowrap select-none overflow-hidden"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            PECKERS
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center max-w-5xl">
            <h1
              className="text-white text-5xl sm:text-[80px] md:text-[100px] leading-[0.9] uppercase"
              style={{
                fontFamily: "var(--font-peakers-bold)",
                letterSpacing: "0.02em",
              }}
            >
              BE PART OF THE <span className="text-[#C41718]">PECKERS</span>{" "}
              INNER CIRCLE
            </h1>

            <h2
              className="text-white text-3xl sm:text-[40px] md:text-[60px] leading-[1] uppercase mt-2"
              style={{
                fontFamily: "var(--font-peakers-bold)",
                letterSpacing: "0.02em",
              }}
            >
              LAUNCHING TOMORROW <span className="text-[#C41718]">-</span> STAY
              TUNED.
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141311] min-h-screen text-white w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col items-center justify-center -mt-[80px]">
        {/* Background */}
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <img
            src={imgHero}
            className="w-full h-full object-cover"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141311]/20 via-transparent to-[#141311]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center mt-20 2xl:mt-32">
          <p
            className="text-[#d4a838] tracking-[5.8px] text-lg md:text-xl font-bold uppercase mb-4"
            style={{ fontFamily: "var(--font-peakers)" }}
          >
            THE INNER CIRCLE
          </p>

          <h1
            className="text-[#e6e2de] text-6xl sm:text-[100px] md:text-[140px] leading-[0.85] text-center mb-12 uppercase flex flex-col items-center"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            <span>
              COLLECT <span className="text-[#9b091b]">CHICKEN</span>
            </span>
            <span>HEADS</span>
          </h1>

          {/* Tiers Flow */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#d4a838] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img
                  src={imgRecruit}
                  className="w-8 object-contain"
                  alt="Recruit"
                />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                RECRUIT
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#9b1c1c] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img src={imgBeta} className="w-8 object-contain" alt="Gamma" />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                GAMMA
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#e07820] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img src={imgGamma} className="w-8 object-contain" alt="Beta" />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                BETA
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#0f0e0c] border-[2px] border-[#c82b3a] rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <img
                  src={imgAlpha}
                  className="w-8 object-contain"
                  alt="Alpha"
                />
              </div>
              <p
                className="text-[#71717a] text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                ALPHA
              </p>
            </div>
          </div>

          <Link
            href="https://peckers.vmos.io/account/auth/register"
            target="_blank"
            className="mt-12 bg-[#8e0b1c] hover:bg-[#a50d21] transition-colors text-white text-lg tracking-[1.6px] px-10 py-4 rounded font-bold uppercase cursor-pointer"
            style={{ fontFamily: "var(--font-peakers)" }}
          >
            CLAIM FREE MILKSHAKE
          </Link>
        </div>
      </section>

      {/* 2. HOW IT WORK$ */}
      <section className="bg-[#1c1b19] px-6 py-24 md:px-12 lg:px-20">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
          <div
            className="border-l-[8px] border-[#e51a38] pl-6 text-white text-5xl md:text-[72px] leading-none uppercase"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            HOW IT WORK$
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="bg-[#211f1d] rounded-xl px-8 py-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#d4a838] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbUserPlus className="text-black text-2xl" />
              </div>
              <TbUserPlus className="absolute -top-4 -right-8 text-[140px] text-white/[0.04] pointer-events-none z-0" />
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-2 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                JOIN
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Sign up online to join the loyalty program and grab a FREE
                MILKSHAKE on us.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#211f1d] rounded-xl px-8 py-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#9b1c1c] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbWallet className="text-[#141311] text-2xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-2 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                ADD TO WALLET
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Add your card to DIGITAL WALLET for easy scanning, or use your
                MEMBER CODE online.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#211f1d] rounded-xl px-8 py-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#e07820] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbReceipt className="text-[#141311] text-2xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-2 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                EARN CHICKEN HEADS
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Get one every day you spend 12 OR MORE. Valid for Eat in, Click
                & Collect, or Website orders.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#211f1d] rounded-xl px-8 py-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-[#c82b3a] w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbLockOpen className="text-[#141311] text-2xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-2 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                UNLOCK
              </h3>
              <p
                className="text-[#a1a1aa] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Collect Chicken heads to level up: GAMMA Free side | BETA Free
                main | ALPHA Free Meal
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#9a091c] rounded-xl px-8 py-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center relative z-10">
                <TbConfetti className="text-[#9a091c] text-3xl" />
              </div>
              <h3
                className="text-[#e6e2de] text-3xl uppercase mt-2 relative z-10"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                REDEEM
              </h3>
              <p
                className="text-[#f4f4f5] text-base leading-relaxed relative z-10"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Redeem your REWARDS at checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CHICKEN HEADS TIER SYSTEM — Figma Design */}
      <section className="bg-[#141311] py-12 md:py-24 px-3 sm:px-4 md:px-6 overflow-hidden border-t border-t-white/5 relative">
        <div className="max-w-[1100px] mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-2 sm:mb-3 md:mb-4 px-2 sm:px-0">
            <div className="flex flex-col gap-2">
              <h2
                className="text-[#e6e2de] text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-none uppercase"
                style={{ fontFamily: "var(--font-peakers-bold)" }}
              >
                THE CHICKEN HEADS
                <br />
                <span className="text-[#d8192a]">TIER SYSTEM</span>
              </h2>
            </div>
            <div
              className="border border-white/20 rounded-md px-4 sm:px-5 py-2 sm:py-2.5 text-white text-xs sm:text-sm tracking-[2px] uppercase whitespace-nowrap self-start md:self-auto"
              style={{ fontFamily: "var(--font-peakers-bold)" }}
            >
              10 HEADS = ALPHA STATUS
            </div>
          </div>
          <div className="px-0 sm:px-2 md:px-0 w-full overflow-x-auto">
            <RewardsRoadmap />
          </div>
        </div>
      </section>

      {/* 4. YOUR CHICKEN HEADS. YOUR CALL. */}
      <section className="bg-[#0f0e0c] px-6 py-14 md:px-12 lg:px-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col gap-8">
            <h2
              className="text-[#e6e2de] text-5xl sm:text-[72px] leading-none uppercase"
              style={{ fontFamily: "var(--font-peakers-bold)" }}
            >
              YOUR CHICKEN
              <br />
              HEADS.
              <br />
              <span className="text-[#d8192a]">YOUR CALL.</span>
            </h2>
            <div className="flex flex-col gap-4">
              <p
                className="text-[#a1a1aa] text-lg sm:text-[20px] max-w-[500px] leading-relaxed"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Earn rewards and use them however you like, stick with your
                favourites or discover something new.
              </p>
              <p
                className="text-[#a1a1aa] text-lg sm:text-[20px] max-w-[500px] leading-relaxed"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                When you join the loyalty scheme, you'll also get a FREE
                MILKSHAKE of your choice, valid for 30 days and redeemable
                in-store only.
              </p>
              <p
                className="text-[#a1a1aa] text-lg sm:text-[20px] max-w-[500px] leading-relaxed"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                You can earn and redeem your rewards in-store, via Click &
                Collect, or on orders placed through our website.
              </p>
              <p
                className="text-[#a1a1aa] text-lg sm:text-[20px] max-w-[500px] leading-relaxed"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Rewards are valid for 30 days from the date they are issued, so
                make sure to use them in time.
              </p>
              <p
                className="text-[#a1a1aa] text-lg sm:text-[20px] max-w-[500px] leading-relaxed"
                style={{ fontFamily: "var(--font-neuzeit)" }}
              >
                Sign up today and start collecting Chicken Heads to unlock more.
              </p>
            </div>

            <OrderButtons />
          </div>

          <div className="relative h-[500px] sm:h-[600px] w-full flex items-center justify-center">
            <CardStack />
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="px-4 py-8 md:p-12 mb-16 lg:mb-32">
        <div className="bg-[#9a081c] rounded-[27px] w-full relative overflow-hidden py-24 md:py-32 flex flex-col items-center justify-center">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[360px] text-white/10 whitespace-nowrap select-none overflow-hidden"
            style={{ fontFamily: "var(--font-peakers-bold)" }}
          >
            PECKERS
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
            <h2
              className="text-5xl sm:text-[72px] text-black leading-none uppercase"
              style={{ fontFamily: "var(--font-peakers-bold)" }}
            >
              Ready to join
              <br />
              PECKERS REWARDS?
            </h2>
            <Link
              href="https://peckers.vmos.io/account/auth/register"
              target="_blank"
              className="bg-black hover:bg-gray-800 transition-colors text-white text-xl sm:text-[27px] tracking-[2.7px] px-12 py-5 rounded-lg uppercase"
              style={{ fontFamily: "var(--font-peakers)" }}
            >
              CLAIM FREE MILKSHAKE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
