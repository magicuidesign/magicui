import { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { allShowcases } from "contentlayer/generated";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { ShowcaseCard } from "@/components/sections/showcase";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page = allShowcases.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allShowcases.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="container py-14 max-w-2xl">
      <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        {page.title}
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        {page.title} uses Magic UI to build their landing page.
      </h3>
      <ShowcaseCard
        title={page.title}
        href={page.href}
        image={page.image}
        affiliation={page.affiliation}
      />
    </article>
  );
}
