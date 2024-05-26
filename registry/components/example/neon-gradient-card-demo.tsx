import { NeonGradientCard } from "@/registry/components/magicui/neon-gradient-card";

export default async function NeonGradientCardDemo() {
  return (
    <NeonGradientCard className="max-w-sm">
      <div className="space-y-6">
        <p className="text-center text-xl">Neon Gradient Card Demo</p>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            feugiat venenatis ipsum. Praesent sed vulputate mauris, id pharetra
            magna.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            feugiat venenatis ipsum. Praesent sed vulputate mauris, id pharetra
            magna.
          </p>
        </div>
      </div>
    </NeonGradientCard>
  );
}
