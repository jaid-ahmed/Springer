// next.config.ts
// This file configures Next.js behavior at the framework level.
// It is read by Next.js at build time and dev server startup.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: renders every component twice in development
  // to help surface side effects and bugs early.
  reactStrictMode: true,
};

// Export the config so Next.js can consume it.
export default nextConfig;