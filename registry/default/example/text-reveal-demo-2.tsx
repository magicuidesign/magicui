import TextReveal from "@/registry/default/magicui/text-reveal";
import Ripple from "@/registry/default/magicui/ripple";

export default function TextRevealDemo() {
  return (
    <div className="z-10 flex min-h-64 w-full flex-col items-center justify-center gap-10 rounded-lg border bg-white py-10 dark:bg-black">
      <TextReveal
        text={["Magic UI", "will change the way", "you design."]}
        side="left"
      >
        <div className="flex size-full items-center justify-center">
          <Ripple />
        </div>
      </TextReveal>
    </div>
  );
}
