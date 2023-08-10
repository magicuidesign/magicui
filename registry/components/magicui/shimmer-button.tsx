import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface ShimmerButtonProps {
  shadow?: string;
  shadowEnabled?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  sparkDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = ({
  shadow = "0 0 calc(var(--active) * 4em) calc(var(--active) * 2em) hsl(260 97% 61% / 0.75),0 0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset",
  shadowEnabled = true,
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
  borderRadius = "100px",
  sparkDuration = "1.8s",
  background = "radial-gradient(ellipse 80% 50% at 50% 120%,rgba(62, 61, 117),rgba(13, 13, 33))",
  className,
  children,
}: ShimmerButtonProps) => {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--spark": sparkDuration,
          "--cut": shimmerSize,
          "--bg": background,
          "--shadow": shadow,
        } as CSSProperties
      }
      className={cn(
        "group relative grid cursor-pointer place-items-center overflow-hidden whitespace-nowrap px-6 py-4 [background:var(--bg)] [border-radius:var(--radius)] [box-shadow:var(--shadow)]",
        "transition-all [--active:0] hover:scale-110",
        { "hover:[--active:1]": shadowEnabled },
        className,
      )}
    >
      {/* spark container */}
      <div className="absolute inset-0 rotate-0 animate-flip overflow-hidden [border-radius:var(--radius)] [container-type:size] [mask:linear-gradient(white,transparent_50%)] ">
        {/* spark before */}
        <div className="absolute -z-[1] w-[200%] rotate-0 animate-rotate transition-all [aspect-ratio:1] [background:conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)] [inset:0_auto_auto_50%] [transform:rotate(-90deg)]  [translate:-50%_-15%] group-hover:opacity-40" />
      </div>
      {/* backdrop */}
      <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
      {/* content */}
      {children}
    </button>
  );
};

export default ShimmerButton;
