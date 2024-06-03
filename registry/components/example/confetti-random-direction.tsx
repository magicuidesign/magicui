import { Button } from "@/components/ui/button";
import { Confetti } from "@/registry/components/magicui/confetti";

export default function ConfettiRandomDirection() {
  const handleClick = () => {
    Confetti({
      angle: Math.random() * 360,
    });
  };

  return (
    <div className="relative justify-center">
      <Button onClick={handleClick}>Trigger Random Direction</Button>
    </div>
  );
}
