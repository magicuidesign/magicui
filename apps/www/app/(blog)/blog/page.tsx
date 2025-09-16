import Link from "next/link";
import Image from "next/image";
import { blogSource } from "@/lib/source";

function calculateReadingTimeFromContent(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const posts = blogSource.getPages();

  const selectedTag = params?.tag ?? "";
  const tags = Array.from(
    new Set(
      // @ts-expect-error - revisit fumadocs types.
      posts.map((p) => p.data?.tag).filter(Boolean),
    ),
  ) as string[];
  tags.sort((a, b) => a.localeCompare(b));

  const filteredPosts = selectedTag
    ? posts.filter(
        // @ts-expect-error - revisit fumadocs types.
        (p) => p.data?.tag === selectedTag,
      )
    : posts;

  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Blog</h1>

      {tags.length > 0 ? (
        <nav className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-3 py-1 text-sm ${
              selectedTag === ""
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            All
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={`rounded-full border px-3 py-1 text-sm ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tag}
            </Link>
          ))}
        </nav>
      ) : null}

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            // @ts-expect-error - revisit fumadocs types.
            const image = post.data?.image as string | undefined;
            const title = (post.data?.title as string | undefined) ?? post.url;
            const description = post.data?.description as string | undefined;
            // @ts-expect-error - revisit fumadocs types.
            const tag = post.data?.tag as string | undefined;
            // @ts-expect-error - revisit fumadocs types.
            const content = (post.data?.content as string | undefined) ?? "";
            const readingTime = calculateReadingTimeFromContent(content);

            return (
              <li key={post.url} className="overflow-hidden rounded-md border">
                <Link href={post.url} className="block">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      width={640}
                      height={360}
                      className="h-40 w-full object-cover"
                    />
                  ) : null}
                  <div className="space-y-2 p-4">
                    <h2 className="line-clamp-2 font-medium leading-tight underline-offset-2 hover:underline">
                      {title}
                    </h2>
                    {description ? (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {description}
                      </p>
                    ) : null}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {tag ? (
                        <span className="rounded-full border px-2 py-0.5">
                          {tag}
                        </span>
                      ) : null}
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
