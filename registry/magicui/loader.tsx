"use client";
import React, { useEffect, useState } from "react";

type Props = {
  name: keyof typeof import("ldrs");
  size?: string;
  color?: string;
  speed?: string;
  stroke?: string;
  strokeLength?: string;
  loaderBgOpacity?: string;
  blurBg?: boolean;
  bgColor?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
};

const Loader = ({
  name,
  size = "40",
  color = "black",
  speed = "2",
  stroke,
  strokeLength,
  loaderBgOpacity,
  blurBg = true,
  bgColor = "bg-white/20",
  containerRef,
}: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    (async () => {
      const LDRS = await import("ldrs");
      const loader = LDRS[name as keyof typeof LDRS];
      if (loader && !customElements.get(`l-${name.toLowerCase()}`)) {
        (loader as any).register();
      }
      setIsReady(true);
    })();
  }, [name]);

  if (!isReady) return null;

  const Tag =
    `l-${name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}` as keyof JSX.IntrinsicElements;

  const LoaderContent = (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        blurBg
          ? `${bgColor} bg-clip-padding backdrop-filter backdrop-blur-xs`
          : `${bgColor}`
      }`}
    >
      {React.createElement(Tag, {
        size,
        color,
        speed,
        stroke,
        "stroke-length": strokeLength,
        "bg-opacity": loaderBgOpacity,
      })}
    </div>
  );

  return containerRef?.current ? (
    <div className="absolute inset-0 z-50 top-0 w-full h-full">
      {LoaderContent}
    </div>
  ) : (
    <div className="fixed inset-0 z-[51] flex items-center justify-center">
      {LoaderContent}
    </div>
  );
};

export default Loader;
