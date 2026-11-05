import { Dither } from "@/registry/magicui/dither"

export default function DitherMonochromeDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
      <Dither
        pattern="horizon"
        color="#0a0a0a"
        className="flex h-56 items-start rounded-xl border bg-white p-4 text-neutral-950 select-none md:h-80 md:p-6"
      >
        <p className="text-sm font-medium">Ink on paper</p>
      </Dither>
      <Dither
        pattern="horizon"
        color="#fafafa"
        className="flex h-56 items-start rounded-xl border bg-neutral-950 p-4 text-white select-none md:h-80 md:p-6"
      >
        <p className="text-sm font-medium">Chalk on slate</p>
      </Dither>
    </div>
  )
}
