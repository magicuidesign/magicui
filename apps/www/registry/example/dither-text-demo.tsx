import { Dither } from "@/registry/magicui/dither"

export default function DitherTextDemo() {
  return (
    <div className="relative isolate h-64 w-full overflow-hidden rounded-lg border bg-white md:h-[400px] dark:bg-black">
      <Dither
        pattern="clouds"
        colors={[
          "var(--dither-low)",
          "var(--dither-mid)",
          "var(--dither-high)",
        ]}
        intensity={1.1}
        className="[--dither-high:#164e63] [--dither-low:#67e8f9] [--dither-mid:#0891b2] dark:[--dither-high:#ecfeff] dark:[--dither-low:#0e7490] dark:[--dither-mid:#22d3ee]"
      />
      {/* The overlay hides the dots everywhere except inside the letters. */}
      <div className="absolute inset-0 flex items-center justify-center bg-white mix-blend-screen select-none dark:bg-black dark:mix-blend-multiply">
        <span className="text-7xl leading-none font-black tracking-tighter text-black sm:text-9xl dark:text-white">
          Dither
        </span>
      </div>
    </div>
  )
}
