import type { MetadataRoute } from "next"
import { headers } from "next/headers"

import { blogSource, source } from "@/lib/source"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const domain = headersList.get("host") as string
  const protocol = "https"
  const allDocs = source.getPages()
  const allBlogs = blogSource.getPages()

  return [
    {
      url: `${protocol}://${domain}`,
      lastModified: new Date(),
    },
    ...allDocs.map((post) => ({
      url: `${protocol}://${domain}${post.url}`,
      lastModified: post.data.date,
    })),
    ...allBlogs.map((post) => ({
      url: `${protocol}://${domain}${post.url}`,
      lastModified: post.data.publishedOn,
    })),
  ]
}
