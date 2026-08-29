import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // NOTE: this used to be a static export (`output: "export"`). It now runs on
  // the Node runtime so the /api/contact route can send mail — deploy to Vercel
  // (or `next build && next start`), not to plain static hosting.
  // Pin the workspace root so Next doesn't pick up unrelated lockfiles
  // elsewhere on the machine.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
