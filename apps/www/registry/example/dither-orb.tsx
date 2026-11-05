import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherOrb() {
  return (
    <DitherField
      pattern="orb"
      className="flex h-80 w-full max-w-xl flex-col justify-between rounded-xl border p-6 text-[#ebdbb2] select-none"
    >
      <div className="max-w-[17rem] self-start rounded-lg bg-[#282828]/85 px-4 py-3 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold tracking-tight">Meet Orb</h3>
        <p className="mt-1 text-sm text-[#d5c4a1]">
          An assistant that reads your docs and answers in seconds.
        </p>
      </div>
      <div className="flex max-w-xs items-center gap-2 rounded-lg border border-[#504945] bg-[#282828]/90 p-1.5 backdrop-blur">
        <input
          type="text"
          aria-label="Ask Orb"
          placeholder="Ask anything"
          className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm text-[#ebdbb2] placeholder:text-[#a89984] focus-visible:outline-none"
        />
        <button
          type="button"
          className="rounded-md bg-[#d79921] px-3 py-1.5 text-sm font-medium text-[#282828] hover:bg-[#fabd2f] focus-visible:ring-2 focus-visible:ring-[#d79921] focus-visible:outline-none"
        >
          Ask
        </button>
      </div>
    </DitherField>
  )
}
