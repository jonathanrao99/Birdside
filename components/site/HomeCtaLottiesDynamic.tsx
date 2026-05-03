"use client";

import dynamic from "next/dynamic";

const HomeCtaLotties = dynamic(() => import("@/components/site/HomeCtaLotties"), {
  loading: () => null,
  ssr: false
});

export default function HomeCtaLottiesDynamic() {
  return <HomeCtaLotties />;
}
