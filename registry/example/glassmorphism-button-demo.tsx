import { GlassmorphismButton } from "@/registry/magicui/glassmorphism-button";

export default function GlassmorphismButtonDemo() {
  return (
    <div className="flex gap-4">
      <GlassmorphismButton variant="circle">Read more</GlassmorphismButton>
      <GlassmorphismButton variant="diamond" color="#FD94B3">
        Hover me
      </GlassmorphismButton>
    </div>
  );
}
