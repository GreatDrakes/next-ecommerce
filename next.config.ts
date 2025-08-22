import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Don’t block builds on ESLint errors (like no-explicit-any)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // (optional) Don’t block builds on type errors
    ignoreBuildErrors: false, // set true if you also want to skip TS errors
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
