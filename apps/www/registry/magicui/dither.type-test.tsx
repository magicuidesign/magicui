import { Dither, DITHER_PATTERNS } from "@/registry/magicui/dither"

const shader = "float field(vec2 uv, float t) { return uv.x; }"

export function DitherTypeTest() {
  return (
    <>
      <Dither />
      <Dither pattern="sunset" />
      <Dither pattern="glow" colors="var(--muted-foreground)" interactive />
      <Dither src="/photo.jpg" colors={["#000", "#fff"]} dotSize={2} />
      <Dither shader={shader} colors={["transparent", "var(--primary)"]} />
      {DITHER_PATTERNS.map((id) => (
        <Dither key={id} pattern={id} />
      ))}
      {/* @ts-expect-error pattern and shader are exclusive */}
      <Dither pattern="horizon" shader={shader} />
      {/* @ts-expect-error pattern and src are exclusive */}
      <Dither pattern="horizon" src="/photo.jpg" />
      {/* @ts-expect-error src and shader are exclusive */}
      <Dither src="/photo.jpg" shader={shader} />
      {/* @ts-expect-error the layer takes no children */}
      <Dither>text</Dither>
    </>
  )
}
