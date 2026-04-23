import { ClickSpark } from "@/registry/magicui/click-spark"

export default function ClickSparkDemo() {
  return (
    <div className="bg-background relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl md:shadow-2xl">
      <ClickSpark
        sparkColor="#a1a1aa"
        sparkSize={8}
        sparkRadius={20}
        sparkCount={7}
        duration={500}
      >
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
          <p className="z-10 bg-gradient-to-b from-zinc-400 to-zinc-900 bg-clip-text text-center text-5xl font-medium tracking-tighter text-transparent dark:from-zinc-100 dark:to-zinc-500">
            Interactive Spark
          </p>
          <p className="z-10 text-center text-sm font-light tracking-wide text-zinc-500 dark:text-zinc-400">
            Click anywhere to experience the effect
          </p>
        </div>
      </ClickSpark>
    </div>
  )
}
