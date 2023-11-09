import { Button } from "@/components/ui/button";
import HeroVideo, {
  HeroVideoAction,
} from "@/registry/components/magicui/hero-video";
import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";

const PlayButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="dark:text-white"
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);

export default function HeroVideoDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-lg border bg-background p-10">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Hero Video
      </span>

      <MagicContainer>
        <MagicCard className="min-h-[400px] [mask:linear-gradient(0deg,transparent_40%,#fff_100%)]">
          <HeroVideo
            title="Magic UI Demo"
            image="https://cdn.dribbble.com/userupload/4145843/file/original-c7a2c9a768450460259f232259d103d2.png?resize=1600x1200"
          >
            <HeroVideoAction>
              <Button className="h-20 w-20 rounded-full" variant="outline">
                <PlayButton />
              </Button>
            </HeroVideoAction>
            <video
              autoPlay
              className="rounded-xl dark:border"
              playsInline
              src="https://cdn.magicui.design/globe.mp4"
            />
          </HeroVideo>
        </MagicCard>
      </MagicContainer>
    </div>
  );
}
