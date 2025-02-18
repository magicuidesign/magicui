/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import MoreArticles, { getReadingTime } from "@/components/blog/more-articles";
import PromoSection from "@/components/blog/promo-section";
import BlogTableOfContents from "@/components/blog/table-of-contents";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { MDXContent } from "@content-collections/mdx/react";
import { allBlogs } from "content-collections";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";

const components = {
  h1: ({ children, ...props }: ComponentProps<"h1">) => (
    <h1
      className="my-7 mb-5 scroll-m-20 text-3xl font-semibold tracking-tighter first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2
      id={
        typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined
      }
      className="my-5 mb-3 scroll-m-20 text-2xl font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3
      className="my-5 mb-3 scroll-m-20 text-lg font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<"h4">) => (
    <h4
      className="my-5 mb-3 scroll-m-20 text-lg font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentProps<"p">) => (
    <p className="my-3" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentProps<"ul">) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<"ol">) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li className="" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="table-container my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className="table-container my-0 w-full overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<"th">) => (
    <th
      className="text-balance border-r border-border bg-neutral-50 px-6 py-3 text-left font-mono text-sm font-semibold tracking-tight text-secondary-foreground last:border-r-0 dark:bg-neutral-900"
      {...props}
    >
      {children}
    </th>
  ),
  tr: ({ children, ...props }: ComponentProps<"tr">) => (
    <tr
      className="border-b last:border-b-0 odd:bg-background even:bg-background/50"
      {...props}
    >
      {children}
    </tr>
  ),
  td: ({ children, ...props }: ComponentProps<"td">) => (
    <td
      className="border-r border-border px-6 py-4 text-sm text-secondary-foreground last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),
  pre: ({ children, ...props }: ComponentProps<"pre">) => (
    <pre
      className="flex h-fit items-center justify-start gap-x-2 overflow-x-auto rounded-md border border-border bg-primary/5 px-2 py-1 font-mono text-sm text-secondary-foreground"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: ComponentProps<"code">) => (
    <code
      className="rounded-md bg-primary/5 px-2 py-1 font-mono text-sm text-secondary-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  img: ({ children, ...props }: ComponentProps<"img">) => (
    <img className="my-2 rounded-xl border border-border" {...props} />
  ),
  a: ({ children, ...props }: ComponentProps<"a">) => {
    const linkText = typeof children === "string" ? children : "Link";
    const autoTitle = props.href ? `Visit ${props.href}` : `Go to ${linkText}`;

    return (
      <a
        className="text-primary underline underline-offset-4"
        title={props.title || autoTitle}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const postSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const post = allBlogs.find((post) => post._meta.path === postSlug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${postSlug}`),
      images: [
        {
          url: post.image || "",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image || ""],
      creator: "@dillionverma",
    },
  };
}

export default function BlogPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  const postSlug = Array.isArray(slug) ? slug[0] : slug;
  const currentIndex = allBlogs.findIndex(
    (post) => post._meta.path === postSlug,
  );
  const post = allBlogs[currentIndex];

  // Initialize with empty headings array - they will be populated after render
  const headings: string[] = [];

  return (
    <div className="mx-auto mt-5 max-w-6xl px-5 xl:px-0">
      <div className="mb-4">
        <Link
          href="/blog"
          className="flex h-8 w-fit items-center justify-center rounded-full border border-border bg-muted px-4 text-sm text-secondary-foreground"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Back to Blog
        </Link>
      </div>
      <article className="mx-auto mt-5 max-w-6xl rounded-xl border border-border">
        {post && (
          <div>
            <div className="relative overflow-hidden rounded-xl p-5 md:p-10">
              <img
                src={post.image}
                alt={post.title}
                className="size-full rounded-xl border border-border object-cover object-left"
              />
            </div>
            <div className="mx-auto flex flex-col items-center justify-center gap-y-2 border-y border-border p-5">
              <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-2">
                <h1 className="text-balance text-center text-3xl font-semibold tracking-tighter md:text-5xl">
                  {post.title}
                </h1>
                <p className="text-balance text-center text-secondary-foreground md:text-lg">
                  {post.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-2 border-b border-border p-3 text-sm text-secondary-foreground">
              <span>{getReadingTime(post.body.raw)} min read</span>
              {post.tag && (
                <>
                  <span>·</span>
                  <span className="rounded-full border border-border bg-primary/5 px-2.5 py-0.5">
                    {post.tag}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-1 lg:grid-cols-7">
          <div className="article-content col-span-5 border-border p-5 lg:border-r lg:p-10">
            <MDXContent code={post?.body.code} components={components} />
          </div>
          <div className="sticky top-16 col-span-2 hidden h-fit w-full flex-col items-start justify-start p-5 text-primary lg:flex ">
            <PromoSection />
            <div className="mt-10 w-full">
              <BlogTableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </article>
      {post && <MoreArticles currentPost={post} />}
    </div>
  );
}
