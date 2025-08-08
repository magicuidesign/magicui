import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/registry/magicui/terminal";

export default function TerminalDemo() {
  return (
    <div className="w-full h-[200vh] overflow-auto flex items-center justify-center">
      <Terminal>
        <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>

        <AnimatedSpan className="text-green-500">
          <span>✔ Preflight checks.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Verifying framework. Found Next.js.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Validating Tailwind CSS.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Validating import alias.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Writing components.json.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Checking registry.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Updating tailwind.config.ts</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Updating app/globals.css</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          <span>✔ Installing dependencies.</span>
        </AnimatedSpan>

        <AnimatedSpan className="text-blue-500">
          <span>ℹ Updated 1 file:</span>
          <span className="pl-2">- lib/utils.ts</span>
        </AnimatedSpan>

        <TypingAnimation className="text-muted-foreground">
          Success! Project initialization completed.
        </TypingAnimation>

        <TypingAnimation className="text-muted-foreground">
          You may now add components.
        </TypingAnimation>
      </Terminal>
    </div>
  );
}
