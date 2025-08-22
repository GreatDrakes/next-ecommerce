import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    
    ignoreDuringBuilds: true,
  },
  typescript: {
    
    ignoreBuildErrors: false, 
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
