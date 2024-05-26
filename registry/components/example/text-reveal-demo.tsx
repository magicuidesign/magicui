import TextReveal from "@/components/magicui/text-reveal";

export default async function TextRevealDemo() {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
      <TextReveal text="Magic UI will change the way you design." />
    </div>
  );
}
