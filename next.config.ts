import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // other config options...
  images: {
    domains: ['localhost','52.91.177.135'],
  },
};

export default nextConfig;
