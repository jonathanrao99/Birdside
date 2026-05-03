import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hero Blob upload",
  robots: { index: false, follow: false }
};

export default function HeroBlobUploadLayout({ children }: { children: ReactNode }) {
  return children;
}
