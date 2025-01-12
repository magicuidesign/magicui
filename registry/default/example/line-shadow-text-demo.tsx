import { LineShadowText } from "@/registry/default/magicui/line-shadow-text";
export default function LineShadowTextDemo() {
  return (
    <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
      Ship
      <LineShadowText
        text="Products"
        className="font-bold italic tracking-tighter"
      />
    </h1>
  );
}
