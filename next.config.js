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
  // Add explicit file exclusions to prevent stack overflow
  webpack: (config, { isServer }) => {
    // Avoid excessive recursive pattern matching
    config.watchOptions = {
      ignored: ["**/node_modules", "**/.git", "**/.next"],
    };

    // Add additional exclusions for build process
    if (!config.externals) {
      config.externals = [];
    }

    // Add specific module exclusions
    if (Array.isArray(config.externals)) {
      config.externals.push("puppeteer");
    }

    return config;
  },
  // Reduce the amount of tracing to prevent stack overflows
  poweredByHeader: false,
  reactStrictMode: false,
};

module.exports = nextConfig;
