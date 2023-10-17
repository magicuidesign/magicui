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
        Never gonna give you up
      </span>
      {/* Magic Card  */}
      <MagicContainer className="relative">
        <MagicCard className="min-h-[400px] [mask:linear-gradient(0deg,transparent_20%,#fff_100%)]">
          <HeroVideo
            title="Never gonna give you up"
            image="https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=1024"
          >
            <HeroVideoAction>
              <Button className="h-20 w-20 rounded-full" variant="outline">
                <PlayButton />
              </Button>
            </HeroVideoAction>
            <iframe
              height="500"
              className="h-[500px] rounded-xl border"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=FmFbhzaToJQ9iXN4"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </HeroVideo>
        </MagicCard>
      </MagicContainer>
    </div>
  );
}
