import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { blogSource, showcaseSource, source } from "@/lib/source"

export const revalidate = false
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = siteConfig.url
  const allDocs = source.getPages()
  const allBlogs = blogSource.getPages()
  const allShowcase = showcaseSource.getPages()

  return [
    {
      url: domain,
      lastModified: new Date(),
    },
    ...allDocs.map((post) => ({
      url: `${domain}${post.url}`,
      lastModified: post.data.date,
    })),
    ...allBlogs.map((post) => ({
      url: `${domain}${post.url}`,
      lastModified: post.data.publishedOn,
    })),
    ...allShowcase.map((post) => ({
      url: `${domain}${post.url}`,
    })),
  ]
}
