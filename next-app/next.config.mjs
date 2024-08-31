import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ap1/v1/:path*",
        destination: "http://localhost:5000/api/v1/:path*", 
      },
    ];
  }, // Added missing comma
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
};

module.exports = withContentlayer(nextConfig);
