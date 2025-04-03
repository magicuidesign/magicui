"use client";

import React, { FC } from "react";

export interface VideoSource {
  src: string;
  type: string;
}

export interface VideoTextProps {
  /**
   * The text to display (will have the video "inside" it)
   */
  text: string;
  /**
   * Array of video sources
   */
  sources: VideoSource[];
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
}

const VideoText: FC<VideoTextProps> = ({
  text,
  sources,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='120' font-weight='bold' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'>${text}</text></svg>")`,
          WebkitMaskImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='120' font-weight='bold' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'>${text}</text></svg>")`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
        >
          {sources.map((source, i) => (
            <source key={i} src={source.src} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element that's transparent but visible for SEO/accessibility */}
      <h1 className="sr-only">{text}</h1>
    </div>
  );
};

export default VideoText;
