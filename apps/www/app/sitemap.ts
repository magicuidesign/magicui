import { allBlogs, allDocs, allPages } from "content-collections";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  const protocol = "https";

  return [
    {
      url: `${protocol}://${domain}`,
      lastModified: new Date(),
    },
    ...allPages.map((post) => ({
      url: `${protocol}://${domain}/${post.slugAsParams}`,
      lastModified: new Date(),
    })),
    ...allDocs.map((post) => ({
      url: `${protocol}://${domain}/docs/${post.slugAsParams}`,
      lastModified: post.date,
    })),
    ...allBlogs.map((post) => ({
      url: `${protocol}://${domain}/blog/${post.slugAsParams}`,
      lastModified: post.publishedOn,
    })),
  ];
}
