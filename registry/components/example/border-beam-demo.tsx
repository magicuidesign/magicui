import { BorderBeam } from "@/registry/components/magicui/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="relative rounded-xl">
      <img
        src="/dashboard-dark.png"
        alt="Hero Image"
        className="hidden w-[700px] rounded-[inherit] border object-contain shadow-lg dark:block"
      />
      <img
        src="/dashboard-light.png"
        alt="Hero Image"
        className="block w-[700px] rounded-[inherit] border object-contain shadow-lg dark:hidden"
      />

      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
