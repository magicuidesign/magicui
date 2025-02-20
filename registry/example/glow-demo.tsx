import { GlowArea, Glow } from "@/registry/magicui/glow";

export default function GlowDemo() {
  return (
    <GlowArea
      size={200}
      className="w-full h-full min-h-72 grid grid-cols-2 gap-4"
    >
      <Glow
        color="#db2777"
        className="border border-muted rounded-lg flex items-center justify-center shadow-lg"
      >
        <span className="text-2xl font-semi-bold">Hover</span>
      </Glow>

      <Glow className="border border-muted rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-2xl font-semi-bold">Me</span>
      </Glow>
    </GlowArea>
  );
}
