import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";

export default function MagicCardDemo() {
  return (
    <MagicContainer
      className={
        "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
      }
    >
      <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
        <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
          Magic
        </p>
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
      <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
        <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
          Card
        </p>
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
      <MagicCard className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
        <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
          Demo
        </p>
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </MagicCard>
    </MagicContainer>
  );
}
