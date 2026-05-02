"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter({ preloadedData = null }) {
  const pathname = usePathname();
  if (pathname.startsWith("/menu") || pathname === "/house-made-sauces" || pathname.startsWith("/studio")) return null;
  return <Footer preloadedData={preloadedData} />;
}
