import { DitherField } from "@/registry/magicui/dither-field"

const cards = [
  {
    pattern: "glow",
    title: "Live previews",
    body: "Every branch gets a URL the moment you push.",
    className: "md:col-span-2",
  },
  {
    pattern: "clouds",
    title: "Edge cache",
    body: "Static assets served from 300 cities.",
    className: "",
  },
  {
    pattern: "waves",
    title: "Instant rollbacks",
    body: "Go back to any deploy in one click.",
    className: "md:col-span-3",
  },
] as const

export default function DitherFieldCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <DitherField
          key={card.title}
          pattern={card.pattern}
          color="var(--muted-foreground)"
          intensity={0.6}
          className={`bg-card flex h-56 flex-col justify-end rounded-xl border p-6 ${card.className}`}
        >
          <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
          <p className="text-muted-foreground text-sm">{card.body}</p>
        </DitherField>
      ))}
    </div>
  )
}
