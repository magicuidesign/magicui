import { KeycapSequence } from "@/registry/magicui/keycap-sequence"

const RELEASE_KEYS = ["⌘", "⇧", "↩"]

export default function KeycapSequenceDemo2() {
  return (
    <article className="border-border bg-background text-foreground w-full max-w-md rounded-xl border p-6 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">
        Ship from the editor
      </h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
        Previews build on every save, and a release is one chord away.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
        <KeycapSequence keys={RELEASE_KEYS} />
        <span className="text-muted-foreground text-sm">
          Deploy to production
        </span>
      </div>
    </article>
  )
}
