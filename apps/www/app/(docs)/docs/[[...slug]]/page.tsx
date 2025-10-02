import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import type { BreadcrumbItem } from "fumadocs-core/breadcrumb"
import { getBreadcrumbItems } from "fumadocs-core/breadcrumb"
import { findNeighbour } from "fumadocs-core/server"
import type { BreadcrumbList, TechArticle, WithContext } from "schema-dts"

import { siteConfig } from "@/config/site"
import { replaceComponentSource } from "@/lib/docs"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Contribute } from "@/components/contribute"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { DocsTableOfContents } from "@/components/docs-toc"
import { SidebarCTA } from "@/components/sidebar-cta"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const doc = page.data
  if (!doc.title || !doc.description) {
    notFound()
  }

  return { doc, page }
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { doc, page } = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/og`)
  ogUrl.searchParams.set("title", doc.title ?? "")
  ogUrl.searchParams.set("description", doc.description ?? "")

  return {
    title: `${doc.title} | React Components & Templates`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
      creator: "@dillionverma",
    },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { doc, page } = await getDocFromParams({ params })
  const MDX = doc.body
  const content = await doc.getText("raw")
  const neighbours = findNeighbour(source.pageTree, page.url)
  const breadcrumbs = getBreadcrumbItems(page.url, source.pageTree, {
    includeRoot: { url: "/docs" },
    includePage: true,
  })
  const lastBreadcrumb = breadcrumbs.at(-1)

  const resolveBreadcrumbName = (item: BreadcrumbItem): string => {
    if (typeof item.name === "string") {
      return item.name
    }

    if (typeof item.name === "number") {
      return `${item.name}`
    }

    return doc.title
  }

  const breadcrumbStructuredData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: resolveBreadcrumbName(item),
      item: absoluteUrl(item.url ?? page.url),
    })),
  }

  const docStructuredData: WithContext<TechArticle> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    name: doc.title,
    description: doc.description,
    url: absoluteUrl(page.url),
    inLanguage: "en-US",
    datePublished: doc.date?.toString(),
    dateModified: doc.lastModified?.toString(),
    mainEntityOfPage: absoluteUrl(page.url),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: "Magic UI Documentation",
      url: absoluteUrl("/docs"),
    },
    wordCount: content ? content.split(/\s+/).length : 0,
  }

  const serializedDocStructuredData = JSON.stringify(docStructuredData).replace(
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
        dangerouslySetInnerHTML={{ __html: serializedDocStructuredData }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializedBreadcrumbStructuredData,
        }}
      />
      <div
        data-slot="docs"
        className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {breadcrumbs.length > 1 ? (
                  <nav
                    aria-label="Breadcrumb"
                    className="text-muted-foreground"
                  >
                    <ol className="flex flex-wrap items-center gap-1 text-sm">
                      {breadcrumbs.map((item) => {
                        const label = resolveBreadcrumbName(item)
                        const key = item.url ?? label
                        const isLast = item === lastBreadcrumb

                        return (
                          <li key={key} className="flex items-center gap-1">
                            {isLast ? (
                              <span
                                aria-current="page"
                                className="text-foreground font-medium"
                              >
                                {label}
                              </span>
                            ) : item.url ? (
                              <Link
                                href={item.url}
                                className="hover:text-foreground transition-colors"
                              >
                                {label}
                              </Link>
                            ) : (
                              <span>{label}</span>
                            )}
                            {!isLast ? <span aria-hidden="true">/</span> : null}
                          </li>
                        )
                      })}
                    </ol>
                  </nav>
                ) : null}
                <div className="flex items-start justify-between">
                  <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                    {doc.title}
                  </h1>
                  <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                    <DocsCopyPage
                      page={await replaceComponentSource(content)}
                      url={absoluteUrl(page.url)}
                    />
                    {neighbours.previous && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="extend-touch-target ml-auto size-8 shadow-none md:size-7"
                        asChild
                      >
                        <Link href={neighbours.previous.url}>
                          <IconArrowLeft />
                          <span className="sr-only">Previous</span>
                        </Link>
                      </Button>
                    )}
                    {neighbours.next && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="extend-touch-target size-8 shadow-none md:size-7"
                        asChild
                      >
                        <Link href={neighbours.next.url}>
                          <span className="sr-only">Next</span>
                          <IconArrowRight />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                {doc.description && (
                  <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                    {doc.description}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
              <MDX components={mdxComponents} />
            </div>
          </div>
          <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
            {neighbours.previous && (
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="shadow-none"
              >
                <Link href={neighbours.previous.url}>
                  <IconArrowLeft /> {neighbours.previous.name}
                </Link>
              </Button>
            )}
            {neighbours.next && (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto shadow-none"
                asChild
              >
                <Link href={neighbours.next.url}>
                  {neighbours.next.name} <IconArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-84 flex-col gap-4 overflow-hidden overscroll-none xl:flex">
          <div className="h-(--top-spacing) shrink-0" />
          {doc.toc?.length ? (
            <div className="no-scrollbar overflow-y-auto px-8">
              <DocsTableOfContents toc={doc.toc} />
              <Contribute page={page} />
              <div className="h-8" />
              <SidebarCTA />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
