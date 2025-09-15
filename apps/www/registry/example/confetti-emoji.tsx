"use client";

import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";

export default function ConfettiEmoji() {
  const handleClick = () => {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "🦄", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
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
    <div className="relative justify-center">
      <Button onClick={handleClick}>Trigger Emoji</Button>
    </div>
  );
}
