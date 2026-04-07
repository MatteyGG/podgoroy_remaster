import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "selfcms.stasis-wp.ru",
      },
    ],
  },
};

export default nextConfig;
