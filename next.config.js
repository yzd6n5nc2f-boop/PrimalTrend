/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_OUTPUT_EXPORT === "true";

const nextConfig = {
  ...(isExport ? { output: "export" } : {}),
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
