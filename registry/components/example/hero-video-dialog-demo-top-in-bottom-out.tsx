import { BorderBeam } from "../magicui/border-beam";
import HeroVideoDialog from "../magicui/hero-video-dialog";

export default function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <section className="max-w-5xl mx-auto h-screen flex flex-col justify-center items-center px-7 lg:px-0 relative">
      <div className="relative rounded-2xl p-1 overflow-hidden">
        <BorderBeam />
        <HeroVideoDialog
          animationStyle="top-in-bottom-out"
          videoSrc="https://www.youtube.com/embed/fYhInYej-lg"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </section>
  );
}
