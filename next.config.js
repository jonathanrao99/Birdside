const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["gsap"]
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
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.elevenlabs.io wss://*.elevenlabs.io",
        "frame-src 'self' https://*.elevenlabs.io",
        "media-src 'self' blob: https:",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join("; ");

      rows.push({
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
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
        destination: "/assets/birdside-logo.png"
      }
    ];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
