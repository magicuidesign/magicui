import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";

export default function MagicCardWithGradient() {
  return (
    <MagicContainer
      className={
        "grid w-full lg:grid-cols-2 grid-cols-1 gap-4 min-h-[500px] lg:min-h-[250px]"
      }
    >
      <MagicCard className="cursor-pointer shadow-2xl flex flex-col justify-center items-center overflow-hidden bg-background p-6">
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Magic
        </p>
      </MagicCard>
      <MagicCard className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background">
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Card
        </p>
      </MagicCard>
    </MagicContainer>
  );
}
