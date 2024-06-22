import { Button } from "@/components/ui/button";
import { CoolMode } from "@/registry/components/magicui/cool-mode";
import React from "react";

export default function CoolModeCustom() {
  return (
    <div className="relative justify-center">
      <CoolMode
        options={{
          particle:
            "https://pbs.twimg.com/profile_images/1782811051504885763/YR5-kWOI_400x400.jpg",
        }}
      >
        <Button>Click Me!</Button>
      </CoolMode>
    </div>
  );
}
