import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', '52.91.177.135', 'piqme.live'],
  },
  // Optional: If you’re deploying behind a reverse proxy like NGINX
  // and want to make sure middleware behaves correctly
  async headers() {
    return [
      {
        source: '/(.*)', // applies to all routes
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
