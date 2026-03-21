import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pedisy-images.s3.sa-east-1.amazonaws.com" }
    ]
  }
};

export default nextConfig;