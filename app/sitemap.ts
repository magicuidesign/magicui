import { allComponents, allPages } from "@/.contentlayer/generated";
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
    {
      url: `${protocol}://${domain}/pricing`,
      lastModified: new Date(),
    },
    ...allPages.map((post) => ({
      url: `${protocol}://${domain}/${post.slugAsParams}`,
      lastModified: new Date(),
    })),
    ...allComponents.map((post) => ({
      url: `${protocol}://${domain}/components/${post.slugAsParams}`,
      lastModified: post.date,
    })),
  ];
}
