import { ComponentPreviewTabs } from "@/components/component-preview-tabs";
import { ComponentSource } from "@/components/component-source";
import { getRegistryComponent } from "@/lib/registry";
import * as React from "react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  preview?: boolean;
  hideCode?: boolean;
}

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  preview = false,
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Component = getRegistryComponent(name);

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }
  return (
    <ComponentPreviewTabs
      name={name}
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  );
}
