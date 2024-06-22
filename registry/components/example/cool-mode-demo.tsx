import { Button } from "@/components/ui/button";
import { CoolMode } from "@/registry/components/magicui/cool-mode";
import React from "react";

export default function CoolModeDemo() {
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button>Click Me!</Button>
      </CoolMode>
    </div>
  );
}
