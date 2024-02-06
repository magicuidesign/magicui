import { BorderBeam } from "@/registry/components/magicui/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="relative rounded-xl">
      <img
        src="/dashboard-dark.png"
        className="rounded-[inherit] border object-contain"
      />

      <BorderBeam />
    </div>
  );
}
