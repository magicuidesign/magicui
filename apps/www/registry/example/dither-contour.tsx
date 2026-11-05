import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherContour() {
  return (
    <DitherField
      pattern="contour"
      className="flex h-96 w-full flex-col items-center justify-center rounded-xl border px-6 text-center text-[#eceff4] select-none"
    >
      <p className="font-mono text-sm text-[#88c0d0]">404</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        You are off the map
      </h2>
      <p className="mt-2 max-w-xs text-sm text-[#d8dee9]">
        This page moved, or it never existed. Head back to a known trail.
      </p>
      <button
        type="button"
        className="mt-6 rounded-md border border-[#88c0d0] bg-[#2e3440]/90 px-4 py-2 text-sm font-medium text-[#88c0d0] transition-colors hover:bg-[#88c0d0] hover:text-[#2e3440] focus-visible:ring-2 focus-visible:ring-[#88c0d0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2e3440] focus-visible:outline-none"
      >
        Back to home
      </button>
    </DitherField>
  )
}
