import { FadeText } from "@/registry/components/magicui/fade-text";

export default async function FadeTextDemo() {
  return (
    <div className="flex flex-col space-y-8">
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.5 } },
        }}
        text="Building Magic"
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="right"
        framerProps={{
          show: { transition: { delay: 2 } },
        }}
        text="Building Magic"
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="down"
        framerProps={{
          show: { transition: { delay: 4 } },
        }}
        text="Building Magic"
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="left"
        framerProps={{
          show: { transition: { delay: 6 } },
        }}
        text="Building Magic"
      />
    </div>
  );
}
