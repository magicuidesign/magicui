import TextShimmer from "@/registry/components/magicui/text-shimmer";

export default async function TextShimmerDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-8 shadow-2xl">
      <TextShimmer className="text-center text-5xl font-semibold leading-none">
        Text Shimmer
      </TextShimmer>
    </div>
  );
}
