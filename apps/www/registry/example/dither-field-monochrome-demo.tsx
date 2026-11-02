import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldMonochromeDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <DitherField
        pattern="horizon"
        color="#0a0a0a"
        className="flex h-80 items-start rounded-xl border bg-white p-6 text-neutral-950"
      >
        <p className="text-sm font-medium">Ink on paper</p>
      </DitherField>
      <DitherField
        pattern="horizon"
        color="#fafafa"
        className="flex h-80 items-start rounded-xl border bg-neutral-950 p-6 text-white"
      >
        <p className="text-sm font-medium">Chalk on slate</p>
      </DitherField>
    </div>
  )
}
