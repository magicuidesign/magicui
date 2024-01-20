import { cn } from "@/lib/utils";
import TextShimmer from "@/registry/components/magicui/text-shimmer";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default async function TextShimmerDemo() {
  return (
    <div className="min-h-[16rem] items-center flex justify-center">
      <div
        className={cn(
          "rounded-full border dark:border-white/5 border-black/5 dark:bg-neutral-900 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer dark:hover:bg-neutral-800 hover:bg-neutral-200",
          "group gap-1",
          "translate-y-[-1rem] animate-fade-in opacity-0",
        )}
      >
        <TextShimmer className="inline-flex items-center justify-center px-4 py-1">
          <span>✨ Introducing Magic UI</span>
          <ArrowRightIcon className="size-3 ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
      </div>
  );
}
