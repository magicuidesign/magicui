import HeroVideo from "@/registry/components/magicui/hero-video";
import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";

export default function HeroVideoDemo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background p-10">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Hero Video
      </span>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <MagicContainer>
        <MagicCard className="[mask:linear-gradient(0deg,transparent_0%,#fff_100%)]">
          <HeroVideo image="https://media.discordapp.net/attachments/993733319386730541/1144082029076557947/newpreviewimage.png?width=2226&height=1228" />
        </MagicCard>
      </MagicContainer>
    </div>
  );
}
