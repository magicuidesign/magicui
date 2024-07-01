import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";

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
