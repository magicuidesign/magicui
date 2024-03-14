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
        source: "/discord",
        destination: "https://discord.gg/WfefJAwQhF",
        permanent: true,
      },
      {
        source: "/components",
        destination: "/docs/components/animated-beam",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/animated-beam",
        permanent: true,
      },
      {
        source: "/sections",
        destination: "/docs/sections/call-to-action",
        permanent: true,
      },
      {
        source: "/docs/sections",
        destination: "/docs/sections/call-to-action",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
