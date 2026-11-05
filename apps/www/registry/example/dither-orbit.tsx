import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherOrbit() {
  return (
    <DitherField
      pattern="orbit"
      className="flex h-28 w-full items-center justify-center rounded-xl border px-4 text-center text-[#eceff4] select-none"
    >
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base">
        <span className="rounded-full bg-[#88c0d0] px-2.5 py-0.5 text-xs font-semibold text-[#2e3440]">
          New
        </span>
        <span className="font-medium">
          Orbit 2.0 is here with live cursors.
        </span>
        <button
          type="button"
          className="font-medium text-[#88c0d0] underline underline-offset-4 hover:text-[#8fbcbb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#88c0d0]"
        >
          Read the release notes
        </button>
      </p>
    </DitherField>
  )
}
