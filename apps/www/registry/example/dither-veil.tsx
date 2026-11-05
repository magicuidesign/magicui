import { Dither } from "@/registry/magicui/dither"

export default function DitherVeil() {
  return (
    <Dither
      pattern="veil"
      className="mx-auto flex aspect-[4/5] w-full max-w-md flex-col rounded-xl border p-8 text-[#e0def4] select-none"
    >
      <p className="text-sm font-medium text-[#c4a7e7]">Veil</p>
      <h3 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
        Private notes that stay yours.
      </h3>
      <p className="mt-3 text-sm text-[#908caa]">
        End-to-end encrypted, on every device you own.
      </p>
      <button
        type="button"
        className="mt-6 w-fit rounded-full bg-[#e0def4] px-5 py-2 text-sm font-medium text-[#191724]"
      >
        Join the waitlist
      </button>
    </Dither>
  )
}
