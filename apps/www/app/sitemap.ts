import { blogSource, source } from "@/lib/source";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  const protocol = "https";
  const allDocs = source.getPages();
  const allBlogs = blogSource.getPages();

  return [
    {
      url: `${protocol}://${domain}`,
      lastModified: new Date(),
    },
    ...allDocs.map((post) => ({
      url: `${protocol}://${domain}${post.url}`,
      // @ts-expect-error - revisit fumadocs types.
      lastModified: post.data.date,
    })),
    ...allBlogs.map((post) => ({
      url: `${protocol}://${domain}${post.url}`,
      // @ts-expect-error - revisit fumadocs types.
      lastModified: post.data.publishedOn,
    })),
  ];
}
