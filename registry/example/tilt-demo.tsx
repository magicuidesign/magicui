import { Tilt } from "@/registry/magicui/tilt";

export default function TiltDemo() {
  return (
    <Tilt>
      <div className="border flex rounded-lg w-full h-[200px] p-6 bg-background shadow-xl justify-center items-center">
        <span className="pointer-events-none z-10 text-black text-center text-6xl font-semibold tracking-tight dark:text-white">
          Hover Tilt
        </span>
      </div>
    </Tilt>
  );
}
