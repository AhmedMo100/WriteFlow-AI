import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "source.unsplash.com", "images.unsplash.com", "mycdn.com"]

  }
};

export default nextConfig;
