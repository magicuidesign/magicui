import { Button } from "@/components/ui/button";
import { Confetti } from "@/registry/components/magicui/confetti";
import { useRef } from "react";

export default function ConfettiBasicCannon() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };
      Confetti({ origin });
    } else {
      Confetti({});
    }
  };

  return (
    <div className="relative justify-center">
      <Button ref={buttonRef} onClick={handleClick}>
        Confetti From Button
      </Button>
    </div>
  );
}
