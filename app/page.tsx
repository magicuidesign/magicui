import { FadeIn } from "@/components/magicui/FadeIn";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = constructMetadata({
  title: "Magic UI",
  description:
    "Beautiful UI components and templates to make your landing page look stunning.",
  image: "https://magicuikit.com/components/opengraph-image",
});

export default function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <FadeIn className="z-10 flex flex-col items-center justify-center w-full h-full">
            <Link
              href={siteConfig.links.twitter}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
              target="_blank"
            >
              Follow along on Twitter
            </Link>
          </FadeIn>
          <FadeIn
            delay={0.1}
            className="z-10 flex flex-col items-center justify-center w-full h-full"
          >
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Create beautiful landing pages in minutes.
            </h1>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.2}
          >
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Magic UI is a curated collection of beautiful landing page
              components built using React + Tailwind CSS + Framer Motion
            </p>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.3}
          >
            <div className="space-x-4">
              <Link
                href="/components"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                Twitter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
