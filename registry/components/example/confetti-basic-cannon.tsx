import { Button } from "@/components/ui/button";
import { Confetti } from "@/registry/components/magicui/confetti";

export default function ConfettiBasicCannon() {
  const handleClick = () => {
    Confetti({}); // Use default settings for basic confetti
  };

  return (
    <div className="relative justify-center">
      <Button onClick={handleClick}>Trigger Basic Cannon</Button>
    </div>
  );
}
