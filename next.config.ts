import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['three'],
  // Empty turbopack config to suppress webpack warning in Next.js 16
  turbopack: {},
};

export default nextConfig;

