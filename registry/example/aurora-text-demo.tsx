import { GradientMaskedText } from "@/registry/magicui/aurora-text";

export default function AuroraTextDemo() {
  return (
    <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      Ship <GradientMaskedText>beautiful</GradientMaskedText>
    </h1>
  );
}
