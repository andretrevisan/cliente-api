import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  allowedDevOrigins: ["192.168.7.8"],
=======
>>>>>>> origin/main
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
