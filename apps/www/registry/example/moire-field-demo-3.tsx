import { MoireField } from "@/registry/magicui/moire-field"

export default function MoireFieldDemo3() {
  return (
    <div className="bg-background text-foreground grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <div className="border-border bg-card flex flex-col gap-3 rounded-lg border p-6">
        <p className="text-4xl font-semibold tracking-tight text-balance">
          14 regions
        </p>
        <p className="text-muted-foreground text-sm text-balance">
          One view across every environment.
        </p>
      </div>
      <div className="border-border bg-card relative flex overflow-hidden rounded-lg border p-6">
        {/* A small rosette to the right of the copy, centred inside the card
            and faded out before its border. */}
        <MoireField
          interactive={false}
          size={4}
          bands={6}
          className="left-[max(40%,8.5rem)] mask-[radial-gradient(circle_closest-side,black_40%,transparent)]"
        />
        <div className="relative z-10 flex flex-col gap-3">
          <p className="text-4xl font-semibold tracking-tight">1.2 s</p>
          <p className="text-muted-foreground max-w-36 text-sm text-balance">
            Median time to a full comparison.
          </p>
        </div>
      </div>
      <div className="border-border bg-card flex flex-col gap-3 rounded-lg border p-6">
        <p className="text-4xl font-semibold tracking-tight text-balance">
          90 days
        </p>
        <p className="text-muted-foreground text-sm text-balance">
          Every deploy kept, ready to trace a regression.
        </p>
      </div>
    </div>
  )
}
