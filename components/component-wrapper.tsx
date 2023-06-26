import { CSSProperties } from "react";

const ComponentWrapper = ({ children }: { children: any }) => {
  return (
    <div className="relative rounded-xl border border-dashed p-8 dark:border-slate-800 md:p-8 flex justify-center items-center flex-col max-w-[65ch]">
      {children}

      <div
        className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
        style={
          {
            "--mask-offset": "50px",
            mask: "linear-gradient(to bottom,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent),linear-gradient(to right,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent)",
            WebkitMask:
              "linear-gradient(to bottom,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent),linear-gradient(to right,transparent,#fff var(--mask-offset) calc(100% - var(--mask-offset)),transparent)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in, xor",
          } as CSSProperties
        }
      />
    </div>
  );
};

export default ComponentWrapper;
