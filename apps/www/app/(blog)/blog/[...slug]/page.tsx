import { BlogTableOfContents } from "@/components/blog/table-of-contents";
import { SidebarCTA } from "@/components/sidebar-cta";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { blogSource } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  return blogSource.generateParams();
}

async function getDocFromParams({ params }: PageProps) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);
  if (!page) notFound();
  const doc = page.data;
  if (!doc.title || !doc.description) {
    notFound();
  }

  return { doc, page };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { doc, page } = await getDocFromParams({ params });

  if (!page) {
    return {};
  }

  return {
    title: `${doc.title} | ${siteConfig.name}`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          // @ts-expect-error - revisit fumadocs types.
          url: doc.image || "",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      // @ts-expect-error - revisit fumadocs types.
      images: [doc.image || ""],
      creator: "@dillionverma",
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { doc, page } = await getDocFromParams({ params });

  // @ts-expect-error - revisit fumadocs types.
  const MDX = doc.body;

  return (
    <div className="mx-auto mt-5 max-w-6xl px-5 xl:px-0">
      <div className="mb-4">
        <Link href="/blog" className={buttonVariants({ variant: "link" })}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
      <article className="mx-auto mt-5 max-w-6xl rounded-xl">
        {doc && (
          <div>
            <div className="relative overflow-hidden rounded-xl p-5 md:p-10">
              <img
                // @ts-expect-error - revisit fumadocs types.
                src={doc.image}
                alt={doc.title}
                className="size-full rounded-xl border border-border object-cover object-left"
              />
            </div>
            <div className="mx-auto flex flex-col items-center justify-center gap-y-2 border-y border-border p-5">
              <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-2">
                <h1 className="text-balance text-center text-3xl font-semibold tracking-tighter md:text-5xl">
                  {doc.title}
                </h1>
                <p className="text-balance text-center text-secondary-foreground md:text-lg">
                  {doc.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-2 border-b border-border p-3 text-sm text-secondary-foreground">
              {/* @ts-expect-error - revisit fumadocs types. */}
              <span>{getReadingTime(doc.content)} min read</span>
              {/* @ts-expect-error - revisit fumadocs types. */}
              {doc.tag && (
                <>
                  <span>·</span>
                  <span className="rounded-full border border-border bg-primary/5 px-2.5 py-0.5">
                    {/* @ts-expect-error - revisit fumadocs types. */}
                    {doc.tag}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-1 lg:grid-cols-7">
          <div className="article-content col-span-5 p-5 lg:p-10">
            <MDX components={mdxComponents} />
          </div>
          <div className="sticky top-16 col-span-2 hidden h-fit w-full flex-col items-start justify-start p-5 text-primary lg:flex ">
            <BlogTableOfContents />
            <div className="h-10" />
            <SidebarCTA />
          </div>
        </div>
      </article>
    </div>
  );
}
