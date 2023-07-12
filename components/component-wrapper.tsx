import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  const mask =
    "linear-gradient(to bottom,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent),linear-gradient(to right,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent)";

  return (
    <div
      className={cn(
        "relative rounded-xl border md:p-20 p-10 flex justify-center items-center flex-col max-w-[65ch]",
        className
      )}
    >
      {children}

      <div
        className={cn(
          `absolute inset-0 -z-10 h-full w-full [background-size:16px_16px]`,
          `bg-[radial-gradient(#00000055_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`
        )}
        style={
          {
            "--mask-offset": "60px",
            mask: mask,
            WebkitMask: mask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in, xor",
            // backgroundImage: `linear-gradient(to right,#1f2937 1px, transparent 1px), linear-gradient(to bottom,#1f2937 1px,transparent 1px)`,
          } as CSSProperties
        }
      />
    </div>
  );
};

export default ComponentWrapper;
