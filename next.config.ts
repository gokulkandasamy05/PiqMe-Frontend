import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // other config options...
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
