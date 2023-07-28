import { Component } from "@/.contentlayer/generated";
import { constructMetadata } from "@/lib/utils";
import { FadeIn } from "@/registry/components/magicui/fade-in";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Templates | Magic UI",
  description: "Beautiful templates to make your landing page look stunning.",
});

export default async function TemplatePage() {
  const posts: Component[] = [];

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of templates that can be used in your own projects.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <FadeIn key={post._id} delay={index * 0.1}>
              <article
                key={post._id}
                className="group relative space-y-2 flex grow flex-col overflow-hidden rounded-xl border hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-all duration-300"
              >
                {post.image && (
                  <video
                    src="https://media.graphassets.com/v4QIVBhuTUCT4uOrH6LO"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="aspect-video overflow-hidden"
                  />
                  // <Image
                  //   src={post.image}
                  //   alt={post.title}
                  //   width={804}
                  //   height={452}
                  //   className="rounded-md border bg-muted transition-colors"
                  //   priority={index <= 1}
                  // />
                )}
                <div className="flex grow flex-col px-3 pb-2 pt-3">
                  <h2>{post.title}</h2>
                  {/* {post.date && (
                  <p className="text-sm text-gray-500">
                    {formatDate(post.date)}
                  </p>
                )} */}
                  {post.summary && (
                    <p className="mb-2 text-sm text-muted-foreground">
                      {post.summary}
                    </p>
                  )}
                  {/* <p className="mb-2 text-sm text-gray-500">
                  A gradient that follows your cursor to paint a border.
                </p> */}
                </div>
                {/* <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.summary && (
                <p className="text-muted-foreground">{post.summary}</p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              )} */}
                <Link href={post.url} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      ) : (
        <p>No templates yet.</p>
      )}
    </div>
  );
}
