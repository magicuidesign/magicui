import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/registry/magicui/terminal"

export default function TerminalDemo2() {
  return (
    <Terminal>
      <TypingAnimation delay={0}>$ ls</TypingAnimation>

      <AnimatedSpan delay={800} className="text-blue-500">
        Documents Downloads Pictures
      </AnimatedSpan>

      <TypingAnimation delay={1600}>$ cd Documents</TypingAnimation>

      <TypingAnimation delay={2400}>$ pwd</TypingAnimation>

      <AnimatedSpan delay={3200} className="text-green-500">
        /home/user/Documents
      </AnimatedSpan>
    </Terminal>
  )
}
