import FlickeringGrid from "@/components/magicui/flickering-grid";

export default function FlickeringGridDemo() {
  return (
    <div className="relative h-[500px] rounded-lg w-full bg-background overflow-hidden border">
      <FlickeringGrid height={800} width={800} />
    </div>
  );
}
