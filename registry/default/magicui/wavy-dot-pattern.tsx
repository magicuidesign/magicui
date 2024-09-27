import { useState } from "react";
import { anime } from "react-anime";

import { cn } from "@/lib/utils";

interface WavyDotPatternProps {
  className?: string;
  gridWidth?: number;
  gridHeight?: number;
  dotWidth?: number;
  dotHeight?: number;
}

export const WavyDotPattern = ({
  className,
  gridWidth,
  gridHeight,
  dotWidth,
  dotHeight,
}: WavyDotPatternProps) => {
  const [dotClickDisabled, setDotClickDisabled] = useState<boolean>(false);

  const handleDotClick = (e: any, width: number, height: number) => {
    setDotClickDisabled(true);

    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 0.7, easing: "easeOutSine", duration: 250 },
        { value: 0.35, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [width, height],
        from: e.target.dataset.index,
      }),
    });

    setTimeout(() => setDotClickDisabled(false), 2000);
  };

  const GRID_WIDTH = gridWidth ? gridWidth : 30;
  const GRID_HEIGHT = gridHeight ? gridHeight : 30;

  const DOT_WIDTH = dotWidth ? "w-[" + dotWidth + "px]" : "w-[8px]";
  const DOT_HEIGHT = dotHeight ? "h-[" + dotHeight + "px]" : "h-[8px]";

  let index = 0;

  const dots = [];

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <button
          className="rounded-[8px] p-[0.8rem]"
          onClick={(e) => handleDotClick(e, GRID_WIDTH, GRID_HEIGHT)}
          data-index={index}
          key={`${i}-${j}`}
          disabled={dotClickDisabled}
        >
          <div
            className={cn(
              "dot-point",
              "rounded-xl bg-gradient-to-r from-[#d9cab3] to-black opacity-35 hover:from-black hover:to-black hover:opacity-100",
              DOT_WIDTH,
              DOT_HEIGHT,
            )}
            data-index={index}
          />
        </button>,
      );
      index++;
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className={cn("max-w-3/4 absolute z-0 grid", className)}
    >
      {dots.map((dot) => dot)}
    </div>
  );
};

export default WavyDotPattern;
