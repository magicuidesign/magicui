import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";

export default function MagicCardWithGradient() {
  return (
    <MagicContainer
      className={
        "flex flex-col gap-4 h-[500px] lg:h-[250px] w-full lg:flex-row"
      }
    >
      <MagicCard className="cursor-pointer shadow-2xl flex flex-col justify-center items-center overflow-hidden bg-background p-6">
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Magic
        </p>
        <div className="pointer-events-none h-full absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
      <MagicCard className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background">
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Card
        </p>
        <div className="pointer-events-none h-full absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
    </MagicContainer>
  );
}
