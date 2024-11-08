/* eslint-disable @next/next/no-img-element */
import { PlayCircle } from "lucide-react";
import {
  VideoModal,
  VideoModalTrigger,
  VideoModalContent,
  VideoModalTitle,
  VideoModalDescription,
  VideoModalVideo,
  VideoPreview,
  VideoPlayButton,
  VideoPlayer,
} from "../magicui/video-modal";
import { Button } from "@/components/ui/button";

const VideoModalDemo = () => {
  return (
    <div className="relative justify-center">
      <VideoModal>
        <VideoModalTrigger>
          <span className="rounded-lg border border-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm">
            Open modal
          </span>
        </VideoModalTrigger>
        <VideoModalContent>
          <VideoModalTitle>Modal Video Demo</VideoModalTitle>
          <VideoModalDescription>
            Your subtitle or description here
          </VideoModalDescription>
          <VideoModalVideo>
            <VideoPlayer>
              <VideoPreview>
                <img
                  src="https://cdn.dribbble.com/userupload/4145843/file/original-c7a2c9a768450460259f232259d103d2.png?resize=1600x1200"
                  alt="Video preview"
                />
              </VideoPreview>
              <VideoPlayButton>
                <button className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:bg-white/10">
                  <PlayCircle className="h-20 w-20 stroke-1 text-white" />
                </button>
              </VideoPlayButton>
              <iframe
                className="h-full w-full"
                src="https://cdn.magicui.design/globe.mp4"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
              />
            </VideoPlayer>
          </VideoModalVideo>
        </VideoModalContent>
      </VideoModal>
    </div>
  );
};

export default VideoModalDemo;
