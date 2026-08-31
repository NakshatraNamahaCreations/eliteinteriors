import type { NextConfig } from "next";
import path from "node:path";

/* Dual-target build:
   - Vercel (VERCEL=1 auto-set):   normal Node build, /api/contact live.
   - Anywhere else (local):        static export to `out/` for Hostinger.
     Static build POSTs to NEXT_PUBLIC_API_BASE for the API.               */
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isVercel
    ? {}
    : {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
      }),
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
