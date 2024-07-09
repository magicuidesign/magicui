import TextUnderline from "@/components/magicui/text-underline";

export default async function TextUnderlineDemo() {
  return (
    <div className="relative z-10 max-w-[32rem]">
      <TextUnderline
        className="text-xl text-black dark:text-white"
        word="20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion. 100% open-source, and customizable."
      />
      <div className="h-4" />
      <TextUnderline
        className="text-xl text-black dark:text-white"
        color={"#9E7AFF"}
        lineStrokeWidth={3}
        duration={1}
        word="20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion. 100% open-source, and customizable."
      />
      <div className="h-4" />
      <TextUnderline
        className="text-xl text-black dark:text-white"
        startPlacement="left"
        endPlacement="right"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        word="20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion. 100% open-source, and customizable."
      />
    </div>
  );
}
