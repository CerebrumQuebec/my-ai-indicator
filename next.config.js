/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    // Reduce call stack usage during build
    optimizePackageImports: [
      "@heroicons/react",
      "@headlessui/react",
      "react-icons",
    ],
  },
  // Explicitly define which files to include in the build
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // Optimize image domains if you're using next/image
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
