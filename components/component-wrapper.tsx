import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

const ComponentWrapper = ({
  className,
  children,
}: {
  className: string;
  children: any;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl border dark:border-slate-800 md:p-8 flex justify-center items-center flex-col max-w-[65ch]",
        className
      )}
    >
      {children}

      <div
        className={cn(
          `absolute inset-0 -z-10 h-full w-full [background-size:16px_16px]`,
          `bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]`
        )}
        style={
          {
            "--mask-offset": "50px",
            mask: "linear-gradient(to bottom,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent),linear-gradient(to right,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent)",
            WebkitMask:
              "linear-gradient(to bottom,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent),linear-gradient(to right,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent)",
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
