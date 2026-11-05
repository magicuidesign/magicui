import { Dither } from "@/registry/magicui/dither"

export default function DitherGruvboxDusk() {
  return (
    <Dither
      pattern="gruvbox-dusk"
      className="flex h-[26rem] w-full flex-col items-center justify-center rounded-xl border px-4 text-center text-[#ebdbb2] select-none md:h-[30rem]"
    >
      <div className="rounded-xl bg-[#1d2021]/80 px-6 py-6 backdrop-blur-sm md:px-10 md:py-8">
        <p className="text-sm font-medium tracking-widest text-[#fabd2f] uppercase">
          Deploy anywhere
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Ship before the sun sets
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-[#d5c4a1]">
          Push to main and watch every region go live in under a minute.
        </p>
        <button
          type="button"
          className="mt-6 rounded-md bg-[#fabd2f] px-5 py-2.5 text-sm font-medium text-[#1d2021] transition-colors hover:bg-[#fe8019] focus-visible:ring-2 focus-visible:ring-[#fabd2f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d2021] focus-visible:outline-none"
        >
          Start deploying
        </button>
      </div>
    </Dither>
  )
}
