import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldMonochromeDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
      <DitherField
        pattern="horizon"
        color="#0a0a0a"
        className="flex h-56 items-start rounded-xl border bg-white p-4 text-neutral-950 select-none md:h-80 md:p-6"
      >
        <p className="text-sm font-medium">Ink on paper</p>
      </DitherField>
      <DitherField
        pattern="horizon"
        color="#fafafa"
        className="flex h-56 items-start rounded-xl border bg-neutral-950 p-4 text-white select-none md:h-80 md:p-6"
      >
        <p className="text-sm font-medium">Chalk on slate</p>
      </DitherField>
    </div>
  )
}
