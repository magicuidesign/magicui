import { cn } from "@/lib/utils";

const RetroGrid = ({ className }: { className?: string }) => {
  const gridLinesStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 0), linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 0)",
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
        "absolute h-full w-full overflow-hidden [perspective:600px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(65deg)]">
        <div className="animate-grid" style={gridLinesStyle} />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
    </div>
  );
};

export default RetroGrid;
