import { RainbowCursor } from "@/registry/magicui/rainbow-cursor"

export default function RainbowCursorDemo() {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl bg-[#050610]">
      <RainbowCursor>
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="text-xs tracking-[0.3em] text-yellow-300 uppercase">
            Follow your flow
          </span>

          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Color in motion.
          </h2>

          <p className="max-w-sm text-sm text-slate-400">
            Move your pointer to draw a ribbon of light.
          </p>
        </div>
      </RainbowCursor>
    </div>
  )
}
