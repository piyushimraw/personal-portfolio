import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  // Empty turbopack config to suppress webpack warning in Next.js 16
  turbopack: {},
};

export default nextConfig;

