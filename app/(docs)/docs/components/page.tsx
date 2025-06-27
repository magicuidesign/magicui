import { componentRegistry } from "@/lib/capture-component-previews";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Components Gallery",
  description: "Browse all available Magic UI components with visual previews.",
};

export default function ComponentsGallery() {
  return (
    <div className="container py-10">
      {/* Button section permanently removed */}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-8"> {/* Added mt-8 for spacing */}
        {componentRegistry.map((component) => (
          <Link key={component.id} href={component.path} className="group block rounded-lg bg-card/30 border border-border/50 overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-[16/9] rounded-t-lg bg-black/95 relative overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105">
              <div className="text-xs text-muted-foreground opacity-70">{component.name}</div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mt-2">{component.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {component.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 