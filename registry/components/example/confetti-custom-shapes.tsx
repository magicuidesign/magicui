import { Button } from "@/components/ui/button";
import { Confetti } from "@/registry/components/magicui/confetti";

export default function ConfettiCustomShapes() {
  const handleClick = () => {
    const scalar = 2;
    const triangle = Confetti.shapeFromPath({
      path: "M0 10 L5 0 L10 10z",
      scalar,
    });
    const square = Confetti.shapeFromPath({
      path: "M0 0 L10 0 L10 10 L0 10 Z",
      scalar,
    });
    const coin = Confetti.shapeFromPath({
      path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
      scalar,
    });
    const tree = Confetti.shapeFromPath({
      path: "M5 0 L10 10 L0 10 Z",
      scalar,
    });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [triangle, square, coin, tree],
      scalar,
    };

    const shoot = () => {
      Confetti({
        ...defaults,
        particleCount: 30,
      });

      Confetti({
        ...defaults,
        particleCount: 5,
        flat: true,
      });

      Confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <div className="relative flex items-center justify-center">
      <Button onClick={handleClick}>Trigger Shapes</Button>
    </div>
  );
}
