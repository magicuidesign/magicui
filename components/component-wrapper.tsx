import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "not-prose max-w-screen relative flex flex-col items-center justify-center rounded-xl border bg-background p-8 md:p-20",
        className,
      )}
    >
      <div
        className={cn(
          `absolute inset-0 h-full w-full [background-size:16px_16px]`,
          `bg-[radial-gradient(#00000055_1px,transparent_1px)] [--mask-offset:60px] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
          `[WebkitMask:mask:linear-gradient(to_bottom,transparent,#fff_var(--mask-offset)_calc(100%-var(--mask-offset)),transparent),linear-gradient(to_right,transparent,#fff_var(--mask-offset)_calc(100%-var(--mask-offset)),transparent)] [mask:linear-gradient(to_bottom,transparent,#fff_var(--mask-offset)_calc(100%-var(--mask-offset)),transparent),linear-gradient(to_right,transparent,#fff_var(--mask-offset)_calc(100%-var(--mask-offset)),transparent)]`,
          `[--webkit-mask-composite:source-in,xor] [mask-composite:intersect]`,
        )}
      />
      {children}
    </div>
  );
};

export default ComponentWrapper;
