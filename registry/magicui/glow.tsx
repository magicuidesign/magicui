"use client";

import {
  ComponentPropsWithoutRef,
  CSSProperties,
  MouseEvent,
  useEffect,
  useRef,
} from "react";

import { cn } from "@/lib/utils";

interface GlowAreaProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * @default 50
   * @type number
   * @description
   * The size of the glow area
   * */
  size?: number;
}

export const GlowArea: React.FC<GlowAreaProps> = (props) => {
  const { className, size = 50, ...rest } = props;
  const element = useRef<HTMLDivElement | null>(null);
  const latestCoords = useRef<{ x: number; y: number } | null>(null);
  const frameId = useRef<number | null>(null);

  const animateGlow = () => {
    if (latestCoords.current && element.current) {
      element.current.style.setProperty(
        "--glow-x",
        `${latestCoords.current.x}px`,
      );
      element.current.style.setProperty(
        "--glow-y",
        `${latestCoords.current.y}px`,
      );

      frameId.current = null;
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    latestCoords.current = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };
    console.log(latestCoords.current);

    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => animateGlow());
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--glow-x");
    e.currentTarget.style.removeProperty("--glow-y");
  };

  return (
    <div
      className={cn("relative", className)}
      ref={element}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        {
          "--glow-size": `${size}px`,
        } as CSSProperties
      }
      {...rest}
    />
  );
};

GlowArea.displayName = "GlowArea";

interface GlowProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * @default "purple"
   * @type string
   * @description
   * The color of the glow
   * */
  color?: string;
}

export const Glow: React.FC<GlowProps> = (props) => {
  const { className, color = "purple", children, ...rest } = props;

  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    element.current?.style.setProperty(
      "--glow-top",
      `${element.current.offsetTop}px`,
    );
    element.current?.style.setProperty(
      "--glow-left",
      `${element.current.offsetLeft}px`,
    );
  }, []);

  return (
    <div ref={element} className={cn(className, "relative")}>
      <div
        style={{
          backgroundImage: `radial-gradient(
            var(--glow-size) var(--glow-size) at 
            calc(var(--glow-x, -99999px) - var(--glow-left, 0px)) 
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            transparent 100%
          )`,
        }}
        className={cn(
          className,
          "absolute pointer-events-none inset-0 transition-all mix-blend-multiply dark:mix-blend-lighten after:content-[''] after:absolute after:bg-background/80 after:inset-[0.1rem] after:rounded-[inherit]",
        )}
      ></div>
      {children}
    </div>
  );
};

Glow.displayName = "Glow";
