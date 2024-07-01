import { docs, pages } from "#/content";
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
    ...pages.map((post) => ({
      url: `${protocol}://${domain}/${post.slug}`,
      lastModified: new Date(),
    })),
    ...docs.map((post) => ({
      url: `${protocol}://${domain}/docs/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
