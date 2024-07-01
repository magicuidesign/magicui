import { FadeText } from "@/components/magicui/fade-text";

export default async function FadeTextDemo() {
  return (
    <div className="flex flex-col space-y-8 text-center">
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.2 } },
        }}
        text="Fade Up"
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="right"
        framerProps={{
          show: { transition: { delay: 0.4 } },
        }}
        text="Fade Right"
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="down"
        framerProps={{
          show: { transition: { delay: 0.6 } },
        }}
        text="Fade Down"
      />
      <FadeText
        className="text-4xl font-bold text-black dark:text-white"
        direction="left"
        framerProps={{
          show: { transition: { delay: 0.8 } },
        }}
        text="Fade Left"
      />
    </div>
  );
}
