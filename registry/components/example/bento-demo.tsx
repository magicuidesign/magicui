import { cn } from "@/lib/utils";

const features = [
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image: "https://automatic.chat/api/og/changelog",
    span: 1,
  },
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image: "https://automatic.chat/api/og/changelog",
    span: 2,
  },
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image: "https://automatic.chat/api/og/changelog",
    span: 2,
  },
  {
    name: "Graph view",
    description:
      "Visualize relationships between items in your library to find connections.",
    image: "https://automatic.chat/api/og/changelog",
    span: 1,
  },
];

export default async function BentoDemo() {
  return (
    <div className="grid w-full grid-cols-3 gap-y-4 md:gap-4">
      {features.map((feature) => (
        <div
          key={feature.name}
          className={cn(
            "group relative col-span-3 flex h-[22rem] flex-col justify-between overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[background:radial-gradient(103.78%_100%_at_50%_0%,rgba(118,146,255,0)_80.55%,rgba(122,150,255,.04)_100%),radial-gradient(120.05%_100%_at_50%_0%,rgba(226,232,255,0)_33.78%,rgba(226,232,255,.08)_100%),rgba(226,232,255,.01)] sm:h-[26rem] lg:row-span-1",
            {
              "lg:col-span-1": feature.span === 1,
              "lg:col-span-2": feature.span === 2,
            },
          )}
        >
          <div></div>
          <div className="p-6 transition-all duration-300 group-hover:-translate-y-20">
            <h3 className="mb-1 text-base font-medium text-neutral-700">
              Graph view
            </h3>
            <p className="max-w-lg text-neutral-400">
              Visualize relationships between items in your library to find
              connections.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
