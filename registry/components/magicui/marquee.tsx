import { cn } from "@/lib/utils";
import { Children, cloneElement } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}: MarqueeProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full overflow-hidden [--gap:1rem] [--duration:20s]",
        className
      )}
    >
      <div
        className={cn("animate-marquee flex items-stretch w-max gap-[--gap]", {
          "[animation-direction:reverse]": reverse,
          "hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {Children.map(children, (child) => cloneElement(child as any))}
        {Children.map(children, (child) => cloneElement(child as any))}
      </div>
    </div>
  );
};

export default Marquee;
