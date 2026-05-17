import { ClickSpark } from "@/registry/magicui/click-spark"

export default function ClickSparkDemo() {
  return (
    <div className="bg-background relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl">
      <ClickSpark
        sparkColor="#a1a1aa"
        sparkSize={10}
        sparkRadius={25}
        sparkCount={8}
        duration={500}
        easing="ease-in-out"
      >
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
          <p className="z-10 bg-gradient-to-b from-zinc-400 to-zinc-900 bg-clip-text text-center text-5xl font-semibold tracking-tighter text-transparent sm:text-7xl dark:from-zinc-100 dark:to-zinc-600">
            Interactive Spark
          </p>
          <p className="z-10 text-center text-base font-light tracking-wide text-zinc-500 dark:text-zinc-400">
            Click anywhere to experience the effect
          </p>
        </div>
      </ClickSpark>
    </div>
  )
}
