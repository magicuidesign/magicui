import type { Metadata } from "next"
import Link from "next/link"
import type { Blog, BreadcrumbList, WithContext } from "schema-dts"

import { siteConfig } from "@/config/site"
import { blogSource } from "@/lib/source"
import {
  absoluteUrl,
  calculateReadingTime,
  constructMetadata,
  formatDate,
  normalizeTag,
  pluralize,
} from "@/lib/utils"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return []
}

const BLOG_DESCRIPTION =
  "Latest articles about UI components, animations, and web development best practices."

export const metadata: Metadata = constructMetadata({
  title: `Blog | ${siteConfig.name}`,
  description: BLOG_DESCRIPTION,
})

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>
}) {
  const params = await searchParams
  const selectedTag = params?.tag ?? ""

  const posts = blogSource.getPages().sort((a, b) => {
    const dateA = new Date(a.data?.publishedOn || 0).getTime()
    const dateB = new Date(b.data?.publishedOn || 0).getTime()
    return dateB - dateA
  })

  const allTags = posts.flatMap((p) => normalizeTag(p.data?.tags))
  const tags = [...new Set(allTags)].filter(Boolean).sort()
  const filteredPosts = selectedTag
    ? posts.filter((p) => normalizeTag(p.data?.tags).includes(selectedTag))
    : posts

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ] as const

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

  // Generate structured data
  const structuredData: WithContext<Blog> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: BLOG_DESCRIPTION,
    url: `${siteConfig.url}/blog`,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.png`,
      },
    },
    blogPost: filteredPosts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.data?.title,
      description: post.data?.description,
      url: `${siteConfig.url}${post.url}`,
      datePublished: post.data?.publishedOn,
      dateModified: post.data?.publishedOn,
      author: {
        "@type": "Person",
        name: post.data?.author,
        url: siteConfig.links?.twitter,
      },
      image: post.data?.image ? [post.data?.image] : undefined,
      keywords:
        normalizeTag(post.data?.tags).length > 0
          ? normalizeTag(post.data?.tags)
          : undefined,
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
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
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <header className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {BLOG_DESCRIPTION}
            </p>
          </div>

          {filteredPosts.length > 0 && (
            <p className="text-muted-foreground text-sm">
              {selectedTag
                ? `${pluralize(filteredPosts.length, "article")} tagged with "${selectedTag}"`
                : `${pluralize(filteredPosts.length, "article")} total`}
            </p>
          )}
        </header>

        {/* {tags.length > 0 && (
          <nav className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  !selectedTag
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                All
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </nav>
        )} */}

        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-lg">
              {selectedTag
                ? `No articles found for "${selectedTag}".`
                : "No posts yet."}
            </p>
            {selectedTag && (
              <Link
                href="/blog"
                className="text-primary mt-4 inline-flex items-center hover:underline"
              >
                View all articles
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(async (post) => {
              const content = await post.data?.getText("raw")
              return (
                <article
                  key={post.url}
                  className="group bg-card hover:bg-accent/5 flex flex-col overflow-hidden rounded-xl border transition-all duration-200"
                >
                  <Link href={post.url} className="flex h-full flex-col">
                    {post.data?.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.data.image}
                          alt={post.data?.title ?? post.url}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col space-y-4 p-6">
                      <div className="flex-1 space-y-2">
                        <h2 className="group-hover:text-primary line-clamp-2 text-xl leading-tight font-semibold transition-colors">
                          {post.data?.title ?? post.url}
                        </h2>
                        {post.data?.description && (
                          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                            {post.data.description}
                          </p>
                        )}
                      </div>

                      <div className="text-muted-foreground flex flex-col gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          {post.data?.publishedOn && (
                            <time dateTime={post.data.publishedOn}>
                              {formatDate(post.data.publishedOn)}
                            </time>
                          )}
                          {post.data?.publishedOn && <span>·</span>}
                          <span>
                            {calculateReadingTime(content ?? "")} min read
                          </span>
                        </div>

                        {normalizeTag(post.data?.tags).length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {normalizeTag(post.data.tags).map((tag) => (
                              <span
                                key={tag}
                                className="bg-muted/50 rounded-md border px-2 py-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
