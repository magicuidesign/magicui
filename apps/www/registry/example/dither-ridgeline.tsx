import { Dither } from "@/registry/magicui/dither"

const links = ["Routes", "Gear", "Journal"] as const

export default function DitherRidgeline() {
  return (
    <Dither
      pattern="ridgeline"
      className="flex h-[26rem] w-full flex-col rounded-xl border text-[#d3c6aa] select-none"
    >
      <nav className="flex items-center justify-between px-6 py-4 text-sm">
        <span className="font-semibold tracking-tight text-[#e5dcc0]">
          Alpine
        </span>
        <div className="flex gap-5">
          {links.map((link) => (
            <button
              key={link}
              type="button"
              className="hover:text-[#e5dcc0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a7c080]"
            >
              {link}
            </button>
          ))}
        </div>
      </nav>
      <div className="px-6 pt-8 md:px-10">
        <h2 className="max-w-md text-4xl font-semibold tracking-tight text-balance text-[#e5dcc0] md:text-5xl">
          Find your line
        </h2>
        <p className="mt-3 max-w-sm text-sm text-[#9da9a0]">
          Trail maps and conditions for every ridge, updated every hour.
        </p>
      </div>
    </Dither>
  )
}
