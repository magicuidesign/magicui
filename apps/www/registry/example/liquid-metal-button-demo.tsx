import { LiquidMetalButton } from "@/registry/magicui/liquid-metal-button"

export default function LiquidMetalButtonDemo() {
  return (
    <LiquidMetalButton
      colorBack="#0a0a0a"
      colorTint="#00d4ff"
      repetition={3}
      distortion={0.3}
      contour={0.88}
      shape="metaballs"
    >
      Liquid Metal
    </LiquidMetalButton>
  )
}
