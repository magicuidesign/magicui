import React, { useCallback, useMemo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface WarpAnimationContainerProps {
  children: React.ReactNode;
  perspective?: number;
  className?: string;
  beamsPerSide?: number;
  beamSize?: number /* Percentage of the container's size */;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
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
      className={clsx(`absolute top-0`)}
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
}) => {
  const sideStyle: React.CSSProperties = {
    position: "absolute",
    transformStyle: "preserve-3d",
    containerType: "inline-size",
  };

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
    <div
      className={clsx(
        "relative grid place-items-center border rounded  p-20",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute left-0 top-0 size-full overflow-hidden pointer-events-none"
        style={{
          perspective: `${perspective}px`,
          containerType: "size",
          transformStyle: "preserve-3d",
          clipPath: "inset(0 0 0 0)",
        }}
      >
        {/* warp__side--top */}
        <div
          style={{
            ...sideStyle,
            width: "100cqi", // 100% of the container's inline size
            height: "100cqmax",
            transformOrigin: "50% 0%",
            transform: "rotateX(-90deg)",
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
        {/* warp__side--right */}
        <div
          style={{
            ...sideStyle,
            width: "100cqh", // 100% of the container's block size
            height: "100cqmax",
            top: 0,
            right: 0,
            transformOrigin: "100% 0%",
            transform: "rotate(-90deg) rotateX(-90deg)",
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
        {/* warp__side--bottom */}
        <div
          style={{
            ...sideStyle,
            width: "100cqi", // 100% of the container's inline size
            height: "100cqmax",
            top: "100%",
            transformOrigin: "50% 0%",
            transform: "rotateX(-90deg)",
          }}
        >
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={beam.x}
              delay={beam.delay}
              duration={beamDuration}
            />
          ))}
        </div>
        {/* warp__side--left */}
        <div
          className={clsx("warp__side", "warp__side--left")}
          style={{
            ...sideStyle,
            width: "100cqh", // 100% of the container's block size
            height: "100cqmax",
            top: 0,
            left: 0,
            transformOrigin: "0% 0%",
            transform: "rotate(90deg) rotateX(-90deg)",
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
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default WarpAnimationContainer;
