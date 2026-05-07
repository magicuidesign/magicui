import { KeycapSequence } from "@/registry/magicui/keycap-sequence"

// Rows share one period (duration + repeatDelay), so offset delays press them in turn.
const ROW_REPEAT_DELAY = 2.6

const shortcuts = [
  { action: "Search everything", keys: ["Ctrl", "K"], delay: 0.25 },
  { action: "Toggle the sidebar", keys: ["Ctrl", "B"], delay: 1.4 },
  { action: "Open the command list", keys: ["Ctrl", "Shift", "P"], delay: 2.6 },
]

export default function KeycapSequenceDemo3() {
  return (
    <section className="border-border bg-background text-foreground w-sm max-w-full rounded-xl border p-6">
      <h3 className="text-lg font-semibold tracking-tight">
        Keyboard shortcuts
      </h3>
      <dl className="divide-border mt-2 divide-y">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.action}
            className="flex items-center justify-between gap-4 py-5"
          >
            {/* Wraps onto a second line rather than crowding the keys. */}
            <dt className="text-muted-foreground min-w-0 text-sm text-pretty">
              {shortcut.action}
            </dt>
            <dd>
              <KeycapSequence
                keys={shortcut.keys}
                delay={shortcut.delay}
                repeatDelay={ROW_REPEAT_DELAY}
              />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
