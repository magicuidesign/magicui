import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import FadeIn from "@/registry/components/magicui/fade-in";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";

export default function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-20 md:pb-12">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <FadeIn className="z-10 flex h-full w-full flex-col items-center justify-center">
          <Link
            href="/components/shimmer-button"
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
            🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span
              className={cn(
                `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                `inline`,
              )}
            >
              Introducing Shimmer Button
            </span>
            <ChevronRight className="ml-1 h-4 w-4 text-gray-500" />
            <div
              className={cn(
                `absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
                `[--webkit-mask-composite:xor] [mask-composite:xor]`,
              )}
            />
          </Link>
        </FadeIn>
        <FadeIn
          // delay={0.0}
          className="z-10 flex h-full w-full flex-col items-center justify-center"
        >
          <h1 className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-9xl">
            Create Magical <br /> Landing Pages
          </h1>
        </FadeIn>
        <FadeIn
          className="z-10 flex h-full w-full flex-col items-center justify-center"
          delay={0.1}
        >
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Magic UI is a curated collection of React + Tailwind CSS + Framer
            Motion components
          </p>
        </FadeIn>
        <FadeIn
          className="z-10 flex h-full w-full flex-col items-center justify-center"
          delay={0.2}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <Link
              href="/pricing"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Lifetime Access
            </Link>
            <Link
              href="/components"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Get Started
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
