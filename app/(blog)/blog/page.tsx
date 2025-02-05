/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/ui/input";
import { allBlogs } from "content-collections";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags and filter out undefined
  const tags = Array.from(
    new Set(allBlogs.map((blog) => blog.tag).filter(Boolean)),
  ).sort();

  // Get featured posts
  const featuredPosts = allBlogs.filter((blog) => blog.featured).slice(0, 7);

  // Filter blogs based on search and tag
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog?.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || blog.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="mx-auto w-full max-w-7xl p-5">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-12 rounded-xl border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Main featured post */}
            <div className="flex flex-col p-5 lg:border-r">
              <h2 className="mb-6 w-fit rounded-full border border-border bg-primary px-3 py-1 text-sm font-semibold tracking-tight text-primary-foreground">
                Featured
              </h2>
              <a
                href={`/blog/${featuredPosts[0]._meta.path}`}
                className="group relative"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-border">
                  <img
                    src={featuredPosts[0].image}
                    alt={featuredPosts[0].title}
                    className="size-full rounded-xl object-cover object-left"
                  />
                </div>
                <div className="py-4">
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    {calculateReadingTime(featuredPosts[0].body.raw)} min read
                    <span className="flex h-6 w-fit items-center justify-center rounded-full border border-border bg-primary/5 px-3 text-sm">
                      {featuredPosts[0].tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                    {featuredPosts[0].title}
                  </h3>
                </div>
              </a>
            </div>

            {/* Secondary featured posts */}
            <div className="flex flex-col">
              {featuredPosts.slice(1, 7).map((blog) => (
                <a
                  key={blog._meta.path}
                  href={`/blog/${blog._meta.path}`}
                  className="group flex gap-4 border-b border-border p-5 first:border-t last:border-b-0 lg:first:border-t-0"
                >
                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      {calculateReadingTime(blog.body.raw)} min read
                      <span className="flex h-6 w-fit items-center justify-center rounded-full border border-border bg-primary/5 px-3 text-sm">
                        {blog.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                      {blog.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`rounded-full border border-border px-3 py-1 text-sm transition-colors ${
              selectedTag === null
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => tag && setSelectedTag(tag)}
              className={`rounded-full border border-border px-3 py-1 text-sm transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted p-12 text-center">
          <Search className="mb-2 text-4xl" />
          <h3 className="mb-2 text-balance text-xl font-medium tracking-tighter">
            No blogs found
          </h3>
          <p className="text-balance text-muted-foreground">
            Try adjusting your search or filter to find what you&apos;re looking
            for
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-1.5 overflow-hidden rounded-xl border border-border md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <li
              key={blog._meta.path}
              className="relative p-4 before:absolute before:-left-1 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-1 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-['']"
            >
              <Link
                href={`/blog/${blog._meta.path}`}
                className="group grid grid-rows-1"
              >
                <div className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="size-full object-cover object-left transition-transform duration-300 ease-in-out group-hover:scale-[1.01] md:max-h-[200px]"
                  />
                </div>
                <div className="py-2">
                  <h3 className="tr mb-2 text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-fit items-center justify-center rounded-full border border-border bg-primary/5 px-3 text-sm">
                      {blog.tag}
                    </span>
                    <span>{calculateReadingTime(blog.body.raw)} min read</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
