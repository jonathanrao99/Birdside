import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Birdside HTX",
  description: "Birdside HTX full Next.js migration"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/css/brasa-template.shared.38e119549.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body style={{ margin: 0 }}>
        {children}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67d43c25fbcd1b83dd9ac238"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/js/brasa-template.schunk.17808c0d08c97489.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/js/brasa-template.schunk.72f02ff067507ae2.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.prod.website-files.com/67d43c25fbcd1b83dd9ac238/js/brasa-template.ac0db634.ca84a4271f3b6a38.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
