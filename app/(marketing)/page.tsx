import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/registry/components/magicui/fade-in";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="space-y-6 pb-8 pt-20 md:pb-12 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <FadeIn className="z-10 flex flex-col items-center justify-center w-full h-full">
            <Link
              href="/components/magic-card"
              className={cn(
                "flex justify-center items-center flex-row",
                "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f]",
                "transition-shadow hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ease-out duration-500",
                "relative after:block after:w-full after:h-full after:absolute after:inset-0 after:p-[1px] after:[border-radius:inherit] after:bg-gradient-to-r after:from-[#ffaa40]/50 after:via-[#9c40ff]/50 after:to-[#ffaa40]/50 after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:content-[''] after:[mask-composite:xor]",
                "after:animate-gradient after:bg-[length:var(--bg-size)_100%]"
              )}
              style={
                {
                  "--bg-size": "300%",
                } as CSSProperties
              }
            >
              {/* <Twitter className="h-4 w-4 mr-2 inline-block" />
              <div
                className={cn(
                  `bg-clip-text text-transparent bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] animate-gradient bg-[length:var(--bg-size)_100%]`
                )}
              >
                Follow along on Twitter
              </div> */}
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
              {/* <span className="sm:hidden">Style, a new CLI and more.</span> */}
              <span
                className={cn(
                  `bg-clip-text text-transparent bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] animate-gradient bg-[length:var(--bg-size)_100%]`,
                  `inline`
                )}
              >
                Introducing Magic Card
              </span>
              <ChevronRight className="ml-1 h-4 w-4 text-gray-500" />
            </Link>
          </FadeIn>
          <FadeIn
            // delay={0.0}
            className="z-10 flex flex-col items-center justify-center w-full h-full"
          >
            <h1 className="font-medium text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tight">
              Create Magical <br /> Landing Pages
            </h1>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.1}
          >
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Magic UI is a curated collection of React + Tailwind CSS + Framer
              Motion components
            </p>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.2}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/components"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
              </Link>
              {/* {!user && (
                <Link
                  href="/components"
                  // href={
                  //   env.NODE_ENV === "development"
                  //     ? "https://buy.stripe.com/test_bIY7uvbbzecfcw09AB"
                  //     : "https://buy.stripe.com/3cs8zHafOdUa0tG9AA"
                  // }
                  // href="https://buy.stripe.com/3cs8zHafOdUa0tG9AA"
                  // target="_blank"
                  // rel="noreferrer"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Get Started
                </Link>
              )} */}
              <Link
                href="https://twitter.com/dillionverma"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                Follow along on Twitter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
