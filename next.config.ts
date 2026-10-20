import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["@react-three/drei"] },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
