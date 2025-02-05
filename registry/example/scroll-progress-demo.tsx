import { ScrollProgress } from "@/registry/magicui/scroll-progress";

export default function ScrollProgressDemo() {
  return (
    <div className="z-10 rounded-lg border border-gray-200 bg-white p-4">
      <ScrollProgress className="top-[65px]" />
      <h2 className="pb-4 font-bold">
        Note: The scroll progress is shown below the navbar of the page.
      </h2>
      <p className="pb-4">
        Magic UI is a collection of re-usable components that you can copy and
        paste into your web apps. It primarily features components, blocks, and
        templates geared towards creating landing pages and user-facing
        marketing materials.
      </p>
    </div>
  );
}
