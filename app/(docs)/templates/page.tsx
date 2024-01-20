import { Component } from "@/.contentlayer/generated";
import { HeroImage } from "@/components/hero-image";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Templates | Magic UI",
  description: "Beautiful templates to make your landing page look stunning.",
});

export default async function TemplatePage() {
  const posts: Component[] = [];

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of templates that can be used in your own projects.
          </p>
        </div>
      </div>
      <hr className="my-8" />

      <HeroImage />
    </div>
  );
}
