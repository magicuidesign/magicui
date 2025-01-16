import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/registry/default/magicui/terminal";

export default function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation className="text-blue-500">
        ~ What is your Name?
      </TypingAnimation>
      <AnimatedSpan delay={2100}>
        <span>+-----------------+</span>
        <span>| Arghya Das |</span>
        <span>+-----------------+</span>
      </AnimatedSpan>

      <TypingAnimation delay={2500} className="text-blue-500">
        ~ What is your Profession?
      </TypingAnimation>
      <AnimatedSpan delay={5200}>
        <span>◇ I am a Full Stack Developer</span>
      </AnimatedSpan>

      <TypingAnimation delay={5400} className="text-blue-500">
        ~ Show me your work!
      </TypingAnimation>
      <AnimatedSpan delay={7500}>
        <a
          href="https://www.itsarghyadas.dev"
          target="_blank"
          className="underline-offset-4 hover:underline"
        >
          ◇ https://www.itsarghyadas.dev
        </a>
      </AnimatedSpan>
    </Terminal>
  );
}
