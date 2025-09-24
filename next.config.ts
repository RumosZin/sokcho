import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Turbopack 비활성화
  },
};

export default nextConfig;
