import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherMeridian() {
  return (
    <DitherField
      pattern="meridian"
      className="flex h-72 w-72 flex-col rounded-xl border p-5 text-[#d3c6aa] select-none"
    >
      <p className="text-xs font-medium tracking-widest text-[#a7c080] uppercase">
        Pro plan
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#e5dcc0]">
        Unlock unlimited projects
      </h3>
      <p className="mt-1 text-sm text-[#9da9a0]">
        Build as many sites as you like with priority support.
      </p>
      <button
        type="button"
        className="mt-auto self-start rounded-md bg-[#a7c080] px-4 py-2 text-sm font-medium text-[#272e33] transition-colors hover:bg-[#b8d08f] focus-visible:ring-2 focus-visible:ring-[#a7c080] focus-visible:ring-offset-2 focus-visible:ring-offset-[#272e33] focus-visible:outline-none"
      >
        Upgrade
      </button>
    </DitherField>
  )
}
