import { BlogTableOfContents } from "@/components/blog/table-of-contents";
import { SidebarCTA } from "@/components/sidebar-cta";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { blogSource } from "@/lib/source";
import { absoluteUrl, calculateReadingTime, formatDate } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

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

      images: [doc.image || ""],
      creator: "@dillionverma",
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { doc, page } = await getDocFromParams({ params });

  const MDX = doc.body;

  // Generate structured data for individual blog post
  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: doc.title,
    description: doc.description,
    url: absoluteUrl(page.url),
    datePublished: doc.publishedOn,
    dateModified: doc.publishedOn,
    author: {
      "@type": "Person",
      name: doc.author || "Magic UI Team",
      url: siteConfig.links?.twitter,
    },
    image: doc.image ? [doc.image] : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(page.url),
    },
    wordCount: doc.content ? doc.content.split(/\s+/).length : 0,
    timeRequired: `PT${calculateReadingTime(doc.content || "")}M`,
    keywords: (() => {
      const docTag = doc.tag;
      if (!docTag) return undefined;
      return Array.isArray(docTag) ? docTag : [docTag];
    })(),
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
                  {doc.publishedOn && (
                    <time className="text-sm text-secondary-foreground">
                      {formatDate(doc.publishedOn)}
                    </time>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center gap-x-2 border-b border-border p-3 text-sm text-secondary-foreground">
                <span>{calculateReadingTime(doc.content)} min read</span>
                {(() => {
                  const docTag = doc.tag;
                  const tags = docTag
                    ? Array.isArray(docTag)
                      ? docTag
                      : [docTag]
                    : [];

                  return (
                    tags.length > 0 && (
                      <>
                        <span>·</span>
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="rounded-full border border-border bg-primary/5 px-2.5 py-0.5 transition-colors hover:bg-primary/10"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </>
                    )
                  );
                })()}
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
    </>
  );
}
