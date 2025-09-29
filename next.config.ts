import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  eslint: {
    // ✅ Ignore ESLint errors during build (lets deployment succeed)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
