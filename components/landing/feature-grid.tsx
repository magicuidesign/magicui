import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const features = [
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: 1,
    href: "/",
  },
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: 2,
    href: "/",
  },
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: 2,
    href: "/",
  },
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image:
      "https://assets.vercel.com/image/upload/v1675318695/nextjs/showcase/loom-illustration.svg",
    span: 1,
    href: "/",
  },
];

export default async function FeatureGrid() {
  return (
    <section id={"feature-grid"} className="container mx-auto">
      <h2 className="text-base font-semibold leading-7 text-orange-600">
        {"Feature Grid"}
      </h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {"Feature Grid"}
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
        {"Feature Grid"}
      </p>
      <div className="grid w-full auto-rows-[22rem] grid-cols-3 gap-y-4 md:gap-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className={cn(
              "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]  dark:bg-neutral-900 ",
              {
                "lg:col-span-1": feature.span === 1,
                "lg:col-span-2": feature.span === 2,
              },
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
    </section>
  );
}
