import { DitherField } from "@/registry/magicui/dither-field"

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
] as const

export default function DitherVeil() {
  return (
    <DitherField
      pattern="veil"
      className="w-full rounded-xl border px-6 pt-24 pb-8 text-[#e0def4] select-none md:px-10 md:pt-32"
    >
      <div className="grid gap-8 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="text-lg font-semibold tracking-tight">Veil</p>
          <p className="mt-1 max-w-[14rem] text-sm text-[#908caa]">
            Private notes that stay yours.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium text-[#c4a7e7]">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#e0def4]">
              {column.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DitherField>
  )
}
