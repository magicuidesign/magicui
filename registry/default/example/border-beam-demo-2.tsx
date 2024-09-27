import { BorderBeam } from "@/registry/default/magicui/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="relative rounded-xl">
      <img
        src="/placeholder-dark.svg"
        alt="Hero Image"
        className="dark:block rounded-[inherit] border size-full mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg hidden"
      />
      <img
        src="/placeholder.svg"
        alt="Hero Image"
        className="block rounded-[inherit] border size-full mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg dark:hidden"
      />

      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
