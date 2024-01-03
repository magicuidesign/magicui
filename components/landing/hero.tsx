import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import FadeIn from "@/registry/components/magicui/fade-in";
import NumberTicker from "@/registry/components/magicui/number-ticker";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";

export default async function Hero() {
  const payments = await db.payment.count({
    where: {
      status: "succeeded",
    },
  });

  return (
    <section id="hero" className="container py-14">
      <div className="container flex max-w-[64rem] flex-col items-center gap-6 pb-8 pt-20 text-center md:pb-12">
        <FadeIn>
          <Link
            href="/components/retro-grid"
            className={cn(
              "relative flex flex-row items-center justify-center",
              "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f]",
              "transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]",
            )}
            style={
              {
                "--bg-size": "300%",
              } as CSSProperties
            }
          >
            <div
              className={cn(
                `absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
                `p-[1px] [mask-composite:subtract]`,
              )}
            />
            🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span
              className={cn(
                `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                `inline`,
              )}
            >
              Introducing Retro Grid
            </span>
            <ChevronRight className="ml-1 h-4 w-4 text-gray-500" />
          </Link>
        </FadeIn>
        <FadeIn
        // delay={0.0}
        >
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Create Magical <br /> Landing Pages <br />
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-sm leading-normal text-muted-foreground sm:text-xl">
            Magic UI is a curated collection of React + Tailwind CSS + Framer
            Motion components
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-col gap-4 md:flex-row">
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "gap-2 whitespace-pre md:flex",
                "group relative w-full gap-1 overflow-hidden rounded-sm text-sm font-semibold tracking-tighter",
                "transform-gpu rounded-sm ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
              )}
            >
              Get Lifetime Access - $79
            </Link>
            <Link
              href="/components"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "gap-2 whitespace-pre md:flex",
                "group relative w-full gap-1 overflow-hidden rounded-sm text-sm font-semibold tracking-tighter",
              )}
            >
              Read Docs
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="container flex flex-col items-center justify-center sm:flex-row">
            <div className="flex flex-row">
              <StarFilledIcon className="h-4 w-4 text-yellow-300" />
              <StarFilledIcon className="h-4 w-4 text-yellow-300" />
              <StarFilledIcon className="h-4 w-4 text-yellow-300" />
              <StarFilledIcon className="h-4 w-4 text-yellow-300" />
              <StarFilledIcon className="h-4 w-4 text-yellow-300" />
            </div>

            <span className="mx-1.5 hidden h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400 sm:block" />

            <span className="inline-block text-center text-xs font-medium leading-snug tracking-tighter">
              Trusted by{" "}
              <NumberTicker
                value={payments}
                className="font-bold"
                delay={0.2}
              />{" "}
              developers to make beautiful landing pages
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
