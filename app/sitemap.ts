import { allDocs, allPages } from "content-collections";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function sitemap(): MetadataRoute.Sitemap {
  const headersList = headers();
  let domain = headersList.get("host") as string;
  let protocol = "https";

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
  ];
}
