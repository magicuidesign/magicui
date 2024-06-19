"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as React from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
  multi?: boolean;
}

export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  multi,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  const renderContent = (content: React.ReactNode) => (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn("overflow-hidden", !isOpened && "max-h-72")}
        >
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]",
            )}
          >
            {content}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "absolute flex items-center justify-center bg-gradient-to-b from-background/10 to-background to-90% p-2",
            isOpened ? "inset-x-0 bottom-0 h-12 from-gray-900/30" : "inset-0 ",
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="mb-8 h-8 text-xs">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );

  if (multi) {
    const childrenArray = React.Children.toArray(children);
    const reactCode = childrenArray[0];
    const svelteCode = childrenArray[1];

    return (
      <Tabs defaultValue="react" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="svelte">Svelte 5</TabsTrigger>
        </TabsList>
        <TabsContent value="react">{renderContent(reactCode)}</TabsContent>
        <TabsContent value="svelte">{renderContent(svelteCode)}</TabsContent>
      </Tabs>
    );
  }

  return renderContent(children);
}
