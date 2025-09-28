import { LightRays } from "@/registry/magicui/light-rays"

export default function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-xs font-semibold tracking-[0.35em] text-slate-800/60 uppercase dark:text-slate-200/60">
          Ambient glow
        </span>
        <h1 className="text-foreground text-4xl font-bold md:text-5xl">
          Light Rays
        </h1>
        <p className="max-w-md text-sm text-slate-800/80 md:text-base dark:text-slate-200/80">
          Drop this component into any container and it will fill the space with
          softly animated light rays shining from above.
        </p>
      </div>
      <LightRays />
    </div>
  )
}
