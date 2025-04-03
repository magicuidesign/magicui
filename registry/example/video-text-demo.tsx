import VideoText from "@/registry/magicui/video-text";

export default function VideoTextDemo() {
  return (
    <div className="relative h-[400px] w-full justify-center rounded-md bg-black dark:bg-black">
      <VideoText
        text="MAGIC"
        sources={[
          {
            src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ocean-small.webm",
            type: "video/webm",
          },
          {
            src: "http://thenewcode.com/assets/videos/ocean-small.mp4",
            type: "video/mp4",
          },
        ]}
      />
    </div>
  );
}
