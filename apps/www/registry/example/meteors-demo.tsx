import { Meteors } from "@/registry/magicui/meteors";

export default function MeteorDemo() {
  return (
    <div className="relative overflow-hidden h-[500px] w-full">
      <Meteors number={30} />
    </div>
  );
}
