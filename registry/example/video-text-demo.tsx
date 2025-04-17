import { VideoText } from "@/registry/magicui/video-text";

export default function VideoTextDemo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <VideoText src="https://cdn.magicui.design/ocean-small.webm">
        OCEAN
      </VideoText>
    </div>
  );
}
