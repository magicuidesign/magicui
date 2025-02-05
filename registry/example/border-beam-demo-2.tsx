import { BorderBeam } from "@/registry/magicui/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="relative rounded-xl">
      <img
        src="/placeholder-dark.svg"
        alt="Hero Image"
        className="mx-auto hidden aspect-video size-full overflow-hidden rounded-[inherit] rounded-xl border object-cover object-center shadow-lg dark:block"
      />
      <img
        src="/placeholder.svg"
        alt="Hero Image"
        className="mx-auto block aspect-video size-full overflow-hidden rounded-[inherit] rounded-xl border object-cover object-center shadow-lg dark:hidden"
      />

      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
