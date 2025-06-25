import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hwnfyppk8d1xygcw.public.blob.vercel-storage.com',
      },
    ],
  },
};


export default nextConfig;
