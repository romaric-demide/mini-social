import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://sje25hcba2nnaaxl.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
