"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string;
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
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask
   * @default "120"
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 120,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
}: VideoTextProps) {
  const content = React.Children.toArray(children).join("");

  const svgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${fontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'>${content}</text></svg>`;
  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <div className={cn(`relative w-full h-full`, className)}>
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
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
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element that's transparent but visible for SEO/accessibility */}
      <h1 className="sr-only">{content}</h1>
    </div>
  );
}
