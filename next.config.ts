import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Unsplash (used in project portfolio cards)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Enforce strict TypeScript checks during build
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
