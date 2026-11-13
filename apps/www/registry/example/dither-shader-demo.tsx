import { Dither } from "@/registry/magicui/dither"

const ribbons = `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x * uAspect, uv.y);
  float warp = fbm(p * 2.0 + vec2(t * 0.1, 0.0)) * 3.0;
  float ribbon = 0.5 + 0.5 * sin((p.x + p.y) * 10.0 + warp - t);
  return ribbon * ribbon * smoothstep(0.0, 0.6, uv.y);
}`

export default function DitherShaderDemo() {
  return (
    <div className="bg-background relative h-72 w-full overflow-hidden rounded-lg border md:h-[400px]">
      <Dither colors={["transparent", "var(--primary)"]} shader={ribbons} />
    </div>
  )
}
