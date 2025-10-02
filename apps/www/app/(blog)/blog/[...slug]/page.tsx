import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import { ArrowLeftIcon } from "lucide-react"
import type { BlogPosting, BreadcrumbList, WithContext } from "schema-dts"

import { siteConfig } from "@/config/site"
import { blogSource } from "@/lib/source"
import { absoluteUrl, calculateReadingTime, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { BlogTableOfContents } from "@/components/blog/table-of-contents"
import { SidebarCTA } from "@/components/sidebar-cta"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export function generateStaticParams() {
  return blogSource.generateParams()
}

async function getDocFromParams({ params }: PageProps) {
  const { slug } = await params
  const page = blogSource.getPage(slug)
  if (!page) notFound()
  const doc = page.data
  if (!doc.title || !doc.description) {
    notFound()
  }

  return { doc, page }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { doc, page } = await getDocFromParams({ params })

  if (!page) {
    return {}
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
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { doc, page } = await getDocFromParams({ params })
  const content = await doc.getText("raw")
  const MDX = doc.body

  const toBreadcrumbLabel = (segment: string) =>
    segment
      .split("-")
      .filter(Boolean)
      .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
      .join(" ") || segment

  const slugSegments = page.url
    .replace(/^\/blog\/?/, "")
    .split("/")
    .filter(Boolean)
  const intermediateCrumbs = slugSegments
    .slice(0, -1)
    .map((segment, index) => ({
      name: toBreadcrumbLabel(segment),
      url: `/blog/${slugSegments.slice(0, index + 1).join("/")}`,
    }))
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    ...intermediateCrumbs,
    { name: doc.title, url: page.url },
  ] as const

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
    wordCount: content ? content.split(/\s+/).length : 0,
    timeRequired: `PT${calculateReadingTime(content || "")}M`,
    keywords: (() => {
      const docTag = doc.tags
      if (!docTag) return undefined
      return Array.isArray(docTag) ? docTag : [docTag]
    })(),
    inLanguage: "en-US",
  }

  const breadcrumbStructuredData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: absoluteUrl(breadcrumb.url),
    })),
  }

  const serializedStructuredData = JSON.stringify(structuredData).replace(
    /</g,
    "\\u003c"
  )
  const serializedBreadcrumbStructuredData = JSON.stringify(
    breadcrumbStructuredData
  ).replace(/</g, "\\u003c")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializedBreadcrumbStructuredData,
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
                  className="border-border size-full rounded-xl border object-cover object-left"
                />
              </div>
              <div className="border-border mx-auto flex flex-col items-center justify-center gap-y-2 border-y p-5">
                <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-2">
                  <h1 className="text-center text-3xl font-semibold tracking-tighter text-balance md:text-5xl">
                    {doc.title}
                  </h1>
                  <p className="text-secondary-foreground text-center text-balance md:text-lg">
                    {doc.description}
                  </p>
                  {doc.publishedOn && (
                    <time className="text-secondary-foreground text-sm">
                      {formatDate(doc.publishedOn)}
                    </time>
                  )}
                </div>
              </div>
              <div className="border-border text-secondary-foreground flex items-center justify-center gap-x-2 border-b p-3 text-sm">
                {(() => {
                  const docTag = doc.tags
                  const tags = docTag
                    ? Array.isArray(docTag)
                      ? docTag
                      : [docTag]
                    : []

                  return (
                    tags.length > 0 && (
                      <>
                        <span>{calculateReadingTime(content)} min read</span>
                        <span>·</span>
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="border-border bg-primary/5 hover:bg-primary/10 rounded-full border px-2.5 py-0.5 transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </>
                    )
                  )
                })()}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-x-1 lg:grid-cols-7">
            <div className="article-content col-span-5 p-5 lg:p-10">
              <MDX components={mdxComponents} />
            </div>
            <div className="text-primary sticky top-16 col-span-2 hidden h-fit w-full flex-col items-start justify-start p-5 lg:flex">
              <BlogTableOfContents />
              <div className="h-10" />
              <SidebarCTA />
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
