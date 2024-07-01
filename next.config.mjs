const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
  },
  images: {
    domains: ["localhost", "cdn.magicui.design"],
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/X4BBMBjHNf",
        permanent: true,
      },
      {
        source: "/components",
        destination: "/docs/components/marquee",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/marquee",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
