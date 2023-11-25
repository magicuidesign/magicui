import { cn } from "@/lib/utils";

export default function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute h-full w-full overflow-hidden [perspective:200px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(45deg)]">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:100vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:200vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-60% dark:from-black" />
    </div>
  );
}
