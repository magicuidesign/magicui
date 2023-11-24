import { cn } from "@/lib/utils";

const RetroGrid = ({ className }: { className?: string }) => {
  const gridLinesStyle = {
    backgroundSize: "60px 60px",
    backgroundRepeat: "repeat",
    transformOrigin: "100% 0 0",
    inset: "-100% 0px",
    width: "200vw",
    height: "100vh",
    marginLeft: "-50%",
  };

  return (
    <div
      className={cn(
        "absolute h-full w-full overflow-hidden [perspective:400px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(55deg)]">
        <div
          className={cn(
            "animate-grid",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
          style={gridLinesStyle}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white from-10% to-transparent dark:from-black" />
    </div>
  );
};

export default RetroGrid;
