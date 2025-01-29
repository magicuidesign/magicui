import Android from "@/registry/magicui/android";

export default function AndroidDemo() {
  return (
    <div className="relative">
      <Android
        className="size-full"
        videoSrc="https://videos.pexels.com/video-files/14993748/14993748-uhd_1296_2304_30fps.mp4"
      />
    </div>
  );
}
