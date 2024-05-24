import GradualSpacing from "@/registry/components/magicui/gradual-spacing";

export default async function GradualSpacingDemo() {
  return (
    <GradualSpacing 
      className="text-center font-display text-4xl font-bold tracking-[-0.02em]  md:text-7xl md:leading-[5rem]"
      text="Gradual Spacing"
    />
  );
}