/* eslint-disable @next/next/no-img-element */
import type { Blog } from "content-collections";
import { allBlogs } from "content-collections";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getRelatedPosts(currentPost: Blog, limit = 3) {
  return allBlogs
    .filter((post) => post._meta.path !== currentPost._meta.path)
    .slice(0, limit);
}

export default function MoreArticles({ currentPost }: { currentPost: Blog }) {
  const relatedPosts = getRelatedPosts(currentPost);

  return (
    <section className="mx-auto max-w-6xl py-10">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-medium tracking-tighter">
        Read more like this
        <ArrowRightIcon className="size-4" />
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post._meta.path}
            href={`/blog/${post._meta.path}`}
            title={post.title}
            className="group flex flex-col"
          >
            <div className="relative overflow-hidden rounded-xl border border-border">
              <img
                src={post.image}
                alt={post.title}
                className="size-full object-contain object-left transition-all duration-300 group-hover:scale-[1.01]"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                <span>{getReadingTime(post.body.raw)} min read</span>
                {post.tag?.[0] && (
                  <>
                    <span>·</span>
                    <span className="rounded-full border border-border bg-primary/5 px-2.5 py-0.5">
                      {post.tag}
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-lg font-medium tracking-tight underline-offset-4 group-hover:underline">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
