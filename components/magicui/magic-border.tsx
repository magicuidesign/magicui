"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export const MagicBorderContainer = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  const init = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        boxes.forEach((box) => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
          box.style.setProperty("--opacity", `1`);
        });
      } else {
        boxes.forEach((box) => {
          box.style.setProperty("--opacity", `0`);
        });
      }
    }
  };

  useEffect(() => {
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map((el) => el as HTMLElement)
      );
  }, []);

  useEffect(() => {
    init();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
    };
  }, [setBoxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
};

export function MagicBorderCard({
  className,
  children,
  maskSize = 200,
  borderColor = "#475569",
  borderWidth = 1,
}: {
  className?: string;
  children?: ReactNode;
  maskSize?: number;
  borderColor?: string;
  borderWidth?: number;
}) {
  let borderMask = `radial-gradient(${maskSize}px ${maskSize}px at var(--mouse-x) var(--mouse-y), black 45%, transparent)`;

  let borderStyle = {
    opacity: `var(--opacity, 0)`,
    border: `${borderWidth}px solid ${borderColor}`,
    maskImage: borderMask,
    WebkitMaskImage: borderMask,
  };

  return (
    <div className={className}>
      {children}
      {/* Border Spotlight */}
      <div
        style={borderStyle}
        className={`pointer-events-none absolute inset-0 z-10 h-full w-full cursor-default rounded-xl border bg-[transparent] opacity-0 transition-opacity duration-500 placeholder:select-none group-hover:opacity-100`}
      />
    </div>
  );
}
