/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["gsap", "react-icons", "lucide-react"],
  },
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    qualities: [75, 80, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ehtazgziwtjqm5ww.public.blob.vercel-storage.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sanity-api/:path*",
        destination: "https://3gu4dx3n.api.sanity.io/:path*",
      },
    ];
  },
};

export default nextConfig;
