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
          className={`bg-card flex h-44 flex-col justify-end rounded-xl border p-5 md:h-56 md:p-6 ${card.className}`}
        >
          {/* Fades the dots out behind the text so it stays readable. */}
          <div className="from-card absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t to-transparent" />
          <h3 className="relative text-lg font-semibold tracking-tight">
            {card.title}
          </h3>
          <p className="text-muted-foreground relative text-sm">{card.body}</p>
        </DitherField>
      ))}
    </div>
  )
}
