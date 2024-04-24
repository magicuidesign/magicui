import { cn } from "@/lib/utils";

export default function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
}: {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
}) {
  return (
    <div
      style={
        {
          "--duration": duration,
          "--radius": radius,
          "--delay": -delay,
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10",
        { "[animation-direction:reverse]": reverse },
        className,
      )}
    >
      {children}
    </div>
  );
}
