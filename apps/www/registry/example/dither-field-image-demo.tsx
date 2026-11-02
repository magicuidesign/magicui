import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldImageDemo() {
  return (
    <DitherField
      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
      color={["#7c2d12", "#fb923c", "#fff7ed"]}
      dotSize={2}
      intensity={0.8}
      className="h-[500px] w-full rounded-lg border bg-black"
    />
  )
}
