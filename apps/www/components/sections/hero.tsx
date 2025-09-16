import { source } from "@/lib/source";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TechStack } from "@/components/tech-stack";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function Hero() {
  const pages = source.getPages() as Array<{
    data?: { title?: string; date?: string };
    url?: string;
  }>;
  const page = pages.sort((a, b) => {
    const dateA = a?.data?.date;
    const dateB = b?.data?.date;
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  })[0];
  const pageTitle = page?.data?.title;

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-5 md:py-14">
        <div className="z-10 flex flex-col">
          <div className="mt-10 grid grid-cols-1 md:mt-20">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              <Link
                href={page?.url ?? ""}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "rounded-full",
                )}
              >
                🎉 <Separator className="mx-2 h-4" orientation="vertical" />
                Introducing {pageTitle}
                <ChevronRight className="ml-1 size-4 text-muted-foreground" />
              </Link>
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "text-black dark:text-white",
                    "relative mx-0 max-w-[43.5rem]  pt-5  md:mx-auto md:px-4 md:py-2",
                    "text-balance text-left font-semibold tracking-tighter md:text-center",
                    "text-5xl sm:text-7xl md:text-7xl lg:text-7xl",
                  )}
                >
                  UI library for Design Engineers
                </h1>
              </div>

              <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg ">
                150+ free and open-source animated components and effects built
                with <b>React</b>, <b>Typescript</b>, <b>Tailwind CSS</b>, and{" "}
                <b>Motion</b>
                .
                <br />
                Perfect companion for <b>shadcn/ui</b>.
              </p>

              <div className="md:mx-auto w-full flex md:max-w-xs flex-col gap-4 gap-y-2 md:flex-row md:justify-center">
                <Link
                  href="/components"
                  className={cn(
                    buttonVariants({
                      variant: "rainbow",
                      size: "lg",
                    }),
                    "w-full gap-2",
                  )}
                >
                  Browse Components
                  <ChevronRight className="ml-1  size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
                <Link
                  href="https://pro.magicui.design"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "rainbow-outline",
                    }),
                    "w-full gap-2",
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
  );
}
