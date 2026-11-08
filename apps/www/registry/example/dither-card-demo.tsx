import { cn } from "@/lib/utils"
import { Dither } from "@/registry/magicui/dither"

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

export default function DitherCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={cn(
            "bg-card relative flex h-44 flex-col justify-end overflow-hidden rounded-xl border p-5 select-none md:h-56 md:p-6",
            card.className
          )}
        >
          <Dither
            pattern={card.pattern}
            colors="var(--muted-foreground)"
            intensity={0.6}
            interactive
          />
          {/* Fades the dots out behind the text so it stays readable. */}
          <div className="from-card absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t to-transparent" />
          <h3 className="relative text-lg font-semibold tracking-tight">
            {card.title}
          </h3>
          <p className="text-muted-foreground relative text-sm">{card.body}</p>
        </div>
      ))}
    </div>
  )
}
