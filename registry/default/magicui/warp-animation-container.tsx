import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { HTMLAttributes, useCallback, useMemo } from "react";

interface WarpAnimationContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
}

const Beam = ({
  width,
  x,
  delay,
  duration,
}: {
  width: string | number;
  x: string | number;
  delay: number;
  duration: number;
}) => {
  const hue = Math.floor(Math.random() * 360);
  const ar = Math.floor(Math.random() * 10) + 1;

  return (
    <motion.div
      className={`absolute top-0`}
      style={{
        left: x,
        width,
        aspectRatio: 1 / ar,
        background: `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
      }}
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const WarpAnimationContainer: React.FC<WarpAnimationContainerProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "hsl(var(--border))",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay =
        Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ x, delay });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

  const topBeams = useMemo(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(), [generateBeams]);

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className={
          "pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
        }
      >
        <div
          style={{
            position: "absolute",
            transformStyle: "preserve-3d",
            containerType: "inline-size",
            width: "100cqi",
            height: "100cqmax",
            transformOrigin: "50% 0%",
            transform: "rotateX(-90deg)",
            backgroundSize: `var(--beam-size) var(--beam-size)`,
            background: `
            linear-gradient(var(--grid-color) 0 1px, transparent 1px var(--beam-size)) 50% -0.5px /
            var(--beam-size) var(--beam-size),
            linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px var(--beam-size))
            50% 50% / var(--beam-size) var(--beam-size)
          `,
          }}
        >
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            transformStyle: "preserve-3d",
            containerType: "inline-size",
            width: "100cqi",
            height: "100cqmax",
            top: "100%",
            transformOrigin: "50% 0%",
            transform: "rotateX(-90deg)",
            backgroundSize: `var(--beam-size) var(--beam-size)`,
            background: `
            linear-gradient(var(--grid-color) 0 1px, transparent 1px var(--beam-size)) 50% -0.5px /
            var(--beam-size) var(--beam-size),
            linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px var(--beam-size))
            50% 50% / var(--beam-size) var(--beam-size)
          `,
          }}
        >
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            transformStyle: "preserve-3d",
            containerType: "inline-size",
            width: "100cqh",
            height: "100cqmax",
            top: 0,
            left: 0,
            transformOrigin: "0% 0%",
            transform: "rotate(90deg) rotateX(-90deg)",
            backgroundSize: `var(--beam-size) var(--beam-size)`,
            background: `
            linear-gradient(var(--grid-color) 0 1px, transparent 1px var(--beam-size)) 50% -0.5px /
            var(--beam-size) var(--beam-size),
            linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px var(--beam-size))
            50% 50% / var(--beam-size) var(--beam-size)
          `,
          }}
        >
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            transformStyle: "preserve-3d",
            containerType: "inline-size",
            width: "100cqh",
            height: "100cqmax",
            top: 0,
            right: 0,
            transformOrigin: "100% 0%",
            transform: "rotate(-90deg) rotateX(-90deg)",
            backgroundSize: `var(--beam-size) var(--beam-size)`,
            background: `
            linear-gradient(var(--grid-color) 0 1px, transparent 1px var(--beam-size)) 50% -0.5px /
            var(--beam-size) var(--beam-size),
            linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px var(--beam-size))
            50% 50% / var(--beam-size) var(--beam-size)
          `,
          }}
        >
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default WarpAnimationContainer;
