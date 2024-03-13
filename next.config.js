const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    // Remove console.log from production except for error logs
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    domains: ["localhost", "cdn.magicui.design"],
  },
  async redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/animated-beam",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/animated-beam",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
