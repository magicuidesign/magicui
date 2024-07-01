import { CoolMode } from "@/components/magicui/cool-mode";
import { Button } from "@/components/ui/button";

export default function CoolModeDemo() {
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button>Click Me!</Button>
      </CoolMode>
    </div>
  );
}
