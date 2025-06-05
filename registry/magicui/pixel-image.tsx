"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
}

const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const isValidGrid = (grid?: Grid) => {
    if (!grid) return false;
    const { rows, cols } = grid;
    return (
      Number.isInteger(rows) &&
      Number.isInteger(cols) &&
      rows >= MIN_GRID &&
      cols >= MIN_GRID &&
      rows <= MAX_GRID &&
      cols <= MAX_GRID
    );
  };

  const { rows, cols } = isValidGrid(customGrid)
    ? customGrid!
    : DEFAULT_GRIDS[grid];
  const total = rows * cols;

  useEffect(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);

  const pieces = Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;

    const clipPath = `polygon(
      ${col * (100 / cols)}% ${row * (100 / rows)}%,
      ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
      ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
      ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
    )`;

    const delay = Math.random() * maxAnimationDelay;
    return {
      clipPath,
      delay,
    };
  });

  return (
    <div className="w-72 h-72 md:w-96 md:h-96 relative select-none">
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <Image
            src={src}
            fill
            alt={`Pixel image piece ${index + 1}`}
            className={`object-cover rounded-[2.5rem] transition-all z-1 ${grayscaleAnimation ? `duration-[${pixelFadeInDuration}ms]` : ""} ${
              grayscaleAnimation
                ? showColor
                  ? "grayscale-0"
                  : "grayscale"
                : ""
            }`}
            style={{
              transition: `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

export default PixelImage;
