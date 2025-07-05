/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Allow TypeScript errors to pass build
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Allow ESLint errors to pass build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional: Set environment variable (for dev flags in code)
  env: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NODE_ENV || "development",
  },
};

module.exports = nextConfig;
