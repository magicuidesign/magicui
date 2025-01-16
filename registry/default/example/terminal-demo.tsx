import { Terminal, AnimatedSpan } from "@/registry/default/magicui/terminal";

export default function TerminalDemo() {
  return (
    <Terminal>
      <AnimatedSpan>
        <span>+---------------------+</span>
        <span>| Magic UI |</span>
        <span>+---------------------+</span>
      </AnimatedSpan>
      <AnimatedSpan delay={0.2}>
        <span>◇ Component Name</span>
        <span>│ my-component</span>
        <span>│</span>
      </AnimatedSpan>
      <AnimatedSpan delay={0.4}>
        <span>◆ Choose a Component Style</span>
        <span>│ ● Animated</span>
        <span>│ ○ Static</span>
      </AnimatedSpan>
    </Terminal>
  );
}
