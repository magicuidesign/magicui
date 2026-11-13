import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TechStack } from "@/components/tech-stack"
import { DitherField } from "@/registry/magicui/dither-field"

export function Hero() {
  const pages = source.getPages() as Array<{
    data?: { title?: string; date?: string }
    url?: string
  }>
  const page = pages.sort((a, b) => {
    const dateA = a?.data?.date
    const dateB = b?.data?.date
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })[0]
  const pageTitle = page?.data?.title

  return (
    <section id="hero">
      <div className="relative isolate h-full overflow-hidden py-5 md:py-14">
        <div className="absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black_70%,transparent)]">
          <DitherField
            pattern="clouds"
            intensity={0.7}
            color={[
              "var(--dither-low)",
              "var(--dither-mid)",
              "var(--dither-high)",
            ]}
            className="bg-background absolute inset-0 [--dither-high:#171717] [--dither-low:#e5e5e5] [--dither-mid:#737373] dark:[--dither-high:#a3a3a3] dark:[--dither-low:#171717] dark:[--dither-mid:#525252]"
          />
          <div className="animate-rainbow pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2),var(--color-1))] bg-size-[200%] mix-blend-screen [--speed:8s] motion-reduce:animate-none dark:mix-blend-multiply" />
        </div>
        <div className="relative z-10 flex flex-col">
          <div className="mt-10 grid grid-cols-1 md:mt-20">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              <Link
                href={page?.url ?? ""}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "rounded-full"
                )}
              >
                🎉 <Separator className="mx-2 h-4" orientation="vertical" />
                Introducing {pageTitle}
                <ChevronRight className="text-muted-foreground ml-1 size-4" />
              </Link>
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "text-black dark:text-white",
                    "relative mx-0 max-w-174 pt-5 md:mx-auto md:px-4 md:py-2",
                    "text-left font-semibold tracking-tighter text-balance md:text-center",
                    "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
                  )}
                >
                  UI library for Design Engineers
                </h1>
              </div>

              <p className="text-primary max-w-xl text-left text-base font-medium tracking-tight text-balance md:text-center md:text-xl">
                150+ free and open-source animated components and effects built
                with <b className="font-semibold">React</b>,{" "}
                <b className="font-semibold">Typescript</b>,{" "}
                <b className="font-semibold">Tailwind CSS</b>, and{" "}
                <b className="font-semibold">Motion</b>
                .
                <br />
                Perfect companion for <b className="font-semibold">shadcn/ui</b>
                .
              </p>

              <div className="flex w-full flex-col gap-4 gap-y-2 md:mx-auto md:max-w-xs md:flex-row md:justify-center">
                <Link
                  href="/components"
                  className={cn(
                    buttonVariants({
                      variant: "rainbow",
                      size: "lg",
                    }),
                    "w-full gap-2"
                  )}
                >
                  Browse Components
                  <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
                <Link
                  href="https://pro.magicui.design"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "rainbow-outline",
                    }),
                    "w-full gap-2"
                  )}
                >
                  Browse Templates
                  <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-56 items-center justify-center">
            <TechStack
              className="mx-auto flex w-full items-center justify-between"
              technologies={[
                "react",
                "typescript",
                "tailwindcss",
                "motion",
                "shadcn",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
