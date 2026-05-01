/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    return [
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

module.exports = nextConfig;
