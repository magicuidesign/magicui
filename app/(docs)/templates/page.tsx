import { Component } from "@/.contentlayer/generated";
import { constructMetadata } from "@/lib/utils";
import FadeIn from "@/registry/components/magicui/fade-in";
import HeroVideo, {
  HeroVideoAction,
} from "@/registry/components/magicui/hero-video";
import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";
import ShimmerButton from "@/registry/components/magicui/shimmer-button";
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
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of templates that can be used in your own projects.
          </p>
        </div>
      </div>
      <hr className="my-8" />

      <MagicContainer>
        <MagicCard className="flex flex-col items-center justify-center p-4">
          <h2>this is a test card</h2>
          <ShimmerButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </ShimmerButton>
        </MagicCard>
      </MagicContainer>
      <HeroVideo
        title="Magic UI Demo"
        image="https://cdn.dribbble.com/userupload/4145843/file/original-c7a2c9a768450460259f232259d103d2.png?resize=1600x1200"
        video="https://cdn.magicui.design/globe.mp4"
      >
        <HeroVideoAction>
          <ShimmerButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </ShimmerButton>
        </HeroVideoAction>
      </HeroVideo>
      {posts?.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <FadeIn key={post._id} delay={index * 0.1}>
              <article
                key={post._id}
                className="group relative flex grow flex-col space-y-2 overflow-hidden rounded-xl border transition-all duration-300 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
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
