import { Button } from "@/components/ui/button"
import { NoiseTexture } from "@/registry/magicui/noise-texture"

export default function NoiseTextureDemo3() {
  return (
    <div className="flex justify-center p-8">
      <Button
        className="group/button relative cursor-pointer overflow-hidden px-8 active:scale-98"
        type="button"
        variant="secondary"
      >
        <span className="relative z-10 font-medium">Subscribe</span>
        <NoiseTexture
          noiseOpacity={0.45}
          className="transition-all group-hover/button:opacity-100"
        />
      </Button>
    </div>
  )
}
