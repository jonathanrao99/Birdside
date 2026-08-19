const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // `motion` is imported from `motion/react` across several client islands; this trims barrel resolution.
    optimizePackageImports: ["gsap", "motion"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**"
      }
    ]
  },
  turbopack: {
    root: __dirname
  },
  async headers() {
    const rows = [
      {
        source: "/vendor/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];

    if (process.env.NODE_ENV === "production") {
      const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://elfsightcdn.com https://universe-static.elfsightcdn.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data: https://cdn.prod.website-files.com",
        "connect-src 'self' https://*.elevenlabs.io wss://*.elevenlabs.io https://cdn.jsdelivr.net https://unpkg.com https://elfsightcdn.com https://universe-static.elfsightcdn.com https://core.service.elfsight.com https://*.elfsight.com",
        "frame-src 'self' https://*.elevenlabs.io https://*.elfsight.com https://www.google.com https://maps.google.com",
        "media-src 'self' blob: https:",
        "worker-src 'self' blob:",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join("; ");

      rows.push({
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp
          }
        ]
      });
    }

    return rows;
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/assets/brand/birdside-logo.png"
      }
    ];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
