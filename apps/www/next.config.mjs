import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*", "./content/**/*"],
  },
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    domains: [
      "localhost",
      "cdn.magicui.design",
      "images.unsplash.com",
      "img.youtube.com",
      "pbs.twimg.com",
    ],
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
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/showcase/:path*.mdx",
        destination: "/showcase/:path*.md",
        permanent: true,
      },
      {
        source: "/blog/:path*.mdx",
        destination: "/blog/:path*.md",
        permanent: true,
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*.md",
        permanent: true,
      },
      {
        source: "/r/:path([^.]*)",
        destination: "/r/:path.json",
        permanent: true,
      },
    ]
  },
  rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
