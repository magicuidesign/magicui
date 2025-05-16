"use client";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TextAnimateDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Parent component state changed. Count:", count);
  }, [count]);

  return (
    <div className="flex flex-col gap-4">
      {/* Button to increment the count and test the state change */}
      <Button onClick={() => setCount((prev) => prev + 1)}>
        Increment ({count})
      </Button>

      {/* TextAnimate component to test the state change */}
      <TextAnimate animation="blurInUp" by="character" once>
        Blur in by character
      </TextAnimate>
    </div>
  );
}
