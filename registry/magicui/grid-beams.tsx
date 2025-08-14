"use client";

import { motion } from "motion/react";
import React, { HTMLAttributes, useMemo } from "react";
import { cn } from "@/lib/utils";

interface GridBeamsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  rayCount?: number;
  rayOpacity?: number;
  raySpeed?: number;
  rayLength?: string;
  gridFadeStart?: number;
  gridFadeEnd?: number;
  backgroundColor?: string;
}

const LightRay = ({
  left,
  rotation,
  width,
  delay,
  duration,
  swayDuration,
  swayDelay,
  blurAmount,
  isStrongerSway,
  opacity,
  speed,
  length,
}: {
  left: string;
  rotation: number;
  width: number;
  delay: number;
  duration: number;
  swayDuration: number;
  swayDelay: number;
  blurAmount: number;
  isStrongerSway: boolean;
  opacity: number;
  speed: number;
  length: string;
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left,
        top: "-5%",
        height: length,
        width: `${width}px`,
        transformOrigin: "50% 0%",
        background: `linear-gradient(to bottom, rgba(200, 220, 255, ${opacity}), rgba(200, 220, 255, 0))`,
        filter: `blur(${blurAmount}px)`,
        mixBlendMode: "screen",
        transform: `translateX(-50%) rotate(${rotation}deg)`,
      }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        transform: [
          `translateX(-50%) rotate(${rotation}deg)`,
          `translateX(-50%) rotate(${rotation + (isStrongerSway ? 1 : 0.5)}deg)`,
          `translateX(-50%) rotate(${rotation}deg)`,
        ],
      }}
      transition={{
        opacity: {
          duration: duration / speed,
          delay: delay / speed,
          repeat: Infinity,
          ease: "easeInOut",
        },
        transform: {
          duration: swayDuration / speed,
          delay: swayDelay / speed,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    />
  );
};

export const GridBeams: React.FC<GridBeamsProps> = ({
  children,
  className,
  gridSize = 40,
  gridColor = "blue",
  rayCount = 15,
  rayOpacity = 0.35,
  raySpeed = 1,
  rayLength = "45vh",
  gridFadeStart = 30,
  gridFadeEnd = 90,
  backgroundColor = "#020412",
  ...props
}) => {
  const baseRayConfigs = useMemo(
    () => [
      // Far left edge rays
      {
        left: "2%",
        rotation: 28,
        width: 42,
        duration: 8,
        delay: -2,
        swayDuration: 14,
        swayDelay: -2,
        blur: 27,
        strongSway: false,
      },
      {
        left: "6%",
        rotation: 25,
        width: 48,
        duration: 7,
        delay: -6,
        swayDuration: 16,
        swayDelay: -6,
        blur: 30,
        strongSway: true,
      },

      // Left side rays - positive angles decreasing
      {
        left: "12%",
        rotation: 22,
        width: 45,
        duration: 6,
        delay: -1,
        swayDuration: 12,
        swayDelay: -1,
        blur: 25,
        strongSway: false,
      },
      {
        left: "20%",
        rotation: 18,
        width: 55,
        duration: 8,
        delay: -3,
        swayDuration: 16,
        swayDelay: -3,
        blur: 28,
        strongSway: true,
      },
      {
        left: "28%",
        rotation: 14,
        width: 40,
        duration: 7,
        delay: -5,
        swayDuration: 14,
        swayDelay: -5,
        blur: 30,
        strongSway: false,
      },
      {
        left: "36%",
        rotation: 10,
        width: 60,
        duration: 9,
        delay: -7,
        swayDuration: 18,
        swayDelay: -7,
        blur: 26,
        strongSway: true,
      },
      {
        left: "43%",
        rotation: 6,
        width: 50,
        duration: 5,
        delay: -2,
        swayDuration: 11,
        swayDelay: -2,
        blur: 32,
        strongSway: false,
      },

      // Center ray - straight down
      {
        left: "50%",
        rotation: 0,
        width: 65,
        duration: 10,
        delay: -6,
        swayDuration: 20,
        swayDelay: -6,
        blur: 24,
        strongSway: false,
      },

      // Right side rays - negative angles increasing in magnitude
      {
        left: "57%",
        rotation: -6,
        width: 50,
        duration: 7,
        delay: -4,
        swayDuration: 15,
        swayDelay: -4,
        blur: 29,
        strongSway: true,
      },
      {
        left: "64%",
        rotation: -10,
        width: 45,
        duration: 6,
        delay: -8,
        swayDuration: 13,
        swayDelay: -8,
        blur: 31,
        strongSway: false,
      },
      {
        left: "72%",
        rotation: -14,
        width: 55,
        duration: 8,
        delay: -1,
        swayDuration: 17,
        swayDelay: -1,
        blur: 27,
        strongSway: true,
      },
      {
        left: "80%",
        rotation: -18,
        width: 40,
        duration: 9,
        delay: -9,
        swayDuration: 19,
        swayDelay: -9,
        blur: 33,
        strongSway: false,
      },
      {
        left: "88%",
        rotation: -22,
        width: 50,
        duration: 11,
        delay: -5,
        swayDuration: 21,
        swayDelay: -5,
        blur: 30,
        strongSway: true,
      },

      // Far right edge rays
      {
        left: "94%",
        rotation: -25,
        width: 48,
        duration: 9,
        delay: -4,
        swayDuration: 15,
        swayDelay: -4,
        blur: 29,
        strongSway: false,
      },
      {
        left: "98%",
        rotation: -28,
        width: 42,
        duration: 6,
        delay: -8,
        swayDuration: 17,
        swayDelay: -8,
        blur: 31,
        strongSway: true,
      },
    ],
    [],
  );

  const rayConfigs = useMemo(() => {
    // If rayCount is different from 15, distribute rays evenly
    if (rayCount === 15) {
      return baseRayConfigs;
    }

    return Array.from({ length: rayCount }, (_, i) => {
      const progress = i / (rayCount - 1);
      const leftPercent = 2 + progress * 96; // 2% to 98%
      const maxAngle = 28;
      const rotation = maxAngle - progress * 2 * maxAngle; // 28 to -28

      return {
        left: `${leftPercent}%`,
        rotation,
        width: 40 + Math.random() * 25, // 40-65px width
        duration: 6 + Math.random() * 5, // 6-11s
        delay: -Math.random() * 10, // 0 to -10s
        swayDuration: 12 + Math.random() * 9, // 12-21s
        swayDelay: -Math.random() * 10, // 0 to -10s
        blur: 24 + Math.random() * 9, // 24-33px
        strongSway: Math.random() > 0.5,
      };
    });
  }, [rayCount, baseRayConfigs]);

  const gridColorValue = useMemo(() => {
    const colorMap: Record<string, string> = {
      blue: "rgba(200, 220, 255, 0.2)",
      cyan: "rgba(0, 255, 255, 0.2)",
      purple: "rgba(200, 150, 255, 0.2)",
      green: "rgba(150, 255, 150, 0.2)",
      pink: "rgba(255, 150, 200, 0.2)",
    };
    return colorMap[gridColor] || "rgba(200, 220, 255, 0.2)";
  }, [gridColor]);

  const gridMask = useMemo(() => {
    const midPoint = (gridFadeStart + gridFadeEnd) / 2;
    return `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) ${gridFadeStart}%, rgba(0,0,0,0.2) ${midPoint}%, rgba(0,0,0,0.6) ${gridFadeEnd - 20}%, rgba(0,0,0,1) ${gridFadeEnd}%)`;
  }, [gridFadeStart, gridFadeEnd]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundColor,
        backgroundImage:
          "radial-gradient(ellipse at 50% -20%, #1a2c5a, #020412 70%)",
      }}
      {...props}
    >
      {/* Static Grid Background with Customizable Gradient Fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${gridColorValue} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColorValue} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* Animated Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {rayConfigs.map((config, index) => (
          <LightRay
            key={index}
            left={config.left}
            rotation={config.rotation}
            width={config.width}
            delay={config.delay}
            duration={config.duration}
            swayDuration={config.swayDuration}
            swayDelay={config.swayDelay}
            blurAmount={config.blur}
            isStrongerSway={config.strongSway}
            opacity={rayOpacity}
            speed={raySpeed}
            length={rayLength}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
