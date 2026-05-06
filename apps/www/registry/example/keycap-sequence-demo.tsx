import { KeycapSequence } from "@/registry/magicui/keycap-sequence"

export default function KeycapSequenceDemo() {
  return (
    <section className="bg-background text-foreground flex w-full flex-col items-center px-6 py-16 text-center">
      <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
        Kestrel
      </p>
      <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Every note, one keystroke away.
      </h2>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed text-pretty">
        Kestrel opens over whatever you are doing, and gets out of the way when
        you are done.
      </p>
      <button
        type="button"
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex h-10 items-center rounded-md px-6 text-sm font-medium whitespace-nowrap transition-colors"
      >
        Download for Mac
      </button>
      {/* The app's command bar, where the shortcut lives in the product. */}
      <div className="border-border bg-background text-muted-foreground mt-10 flex h-11 w-full max-w-sm items-center gap-4 rounded-xl border pr-2.5 pl-4 text-left text-sm shadow-xs">
        <span className="min-w-0 flex-1 truncate">Search notes and tasks…</span>
        <KeycapSequence />
      </div>
    </section>
  )
}
