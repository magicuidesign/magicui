import { constructMetadata } from "@/lib/utils";
import FadeIn from "@/registry/components/magicui/fade-in";
import { allComponents } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Components | Magic UI",
  description:
    "Beautiful UI components to make your landing page look stunning.",
});

export default async function ComponentPage() {
  const posts = allComponents
    .filter((post) => post.date <= new Date().toISOString() && post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-medium lg:text-5xl">
            Components
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of components that can be used in your own projects.
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
                className="group relative flex h-full w-full grow flex-col overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
              >
                {post.video && (
                  <div className="overflow-hidden">
                    <video
                      src={post.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="relative -bottom-1 aspect-video" // needed because random black line at bottom of video
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-end p-3">
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
                </div>

                <Link href={post.url} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      ) : (
        <p>No components yet.</p>
      )}
    </div>
  );
}
