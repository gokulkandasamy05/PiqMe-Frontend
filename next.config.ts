import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '52.91.177.135', 'piqme.live'],
  },
};

export default nextConfig;
