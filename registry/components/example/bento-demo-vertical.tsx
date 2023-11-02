import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const features = [
  {
    name: "1. Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: "row-start-1 row-end-4 col-start-2 col-end-3",
    href: "/",
  },
  {
    name: "2. Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: "col-start-1 col-end-2 row-start-1 row-end-3",
    href: "/",
  },
  {
    name: "3. Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: "col-start-1 col-end-2 row-start-3 row-end-4",
    href: "/",
  },
  {
    name: "4. Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: "col-start-3 col-end-3 row-start-1 row-end-2",
    href: "/",
  },
  {
    name: "5. Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: "col-start-3 col-end-3 row-start-2 row-end-4",
    href: "/",
  },
];

export default async function BentoDemo() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4">
      {features.map((feature) => (
        <div
          key={feature.name}
          className={cn(
            "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-neutral-900",
            feature.span,
          )}
        >
          <div>
            <img
              className="absolute -right-20 -top-20 opacity-60"
              src={feature.image}
            />
          </div>
          <div className="p-6 transition-all duration-300 group-hover:-translate-y-10">
            <h3 className="mb-1 text-base font-medium text-neutral-700 dark:text-neutral-300">
              {feature.name}
            </h3>
            <p className="max-w-lg text-neutral-400">{feature.description}</p>
          </div>
          <div
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
              "translate-y-10 opacity-0",
              "absolute bottom-4 w-full",
            )}
          >
            <Button variant="ghost" size="sm" asChild>
              <a href={feature.href}>
                Learn more
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </div>
      ))}
    </div>
  );
}
