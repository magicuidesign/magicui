import { WaterRipple } from "@/registry/magicui/water-ripple"

export default function Component() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-neutral-100 dark:bg-neutral-900">
      <WaterRipple />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
          Water Ripple
        </h1>
        <p className="text-muted-foreground max-w-md text-sm md:text-base">
          Move your cursor across the surface to send waves through it.
        </p>
      </div>
    </div>
  )
}
