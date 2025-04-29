"use client";

import { AnimatedSubscribeButton } from "@/registry/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export default function AnimatedSubscribeButtonControlledDemo() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setLoading(false);
  }

  return (
    <AnimatedSubscribeButton
      className="w-36"
      subscribeStatus={subscribed}
      onClick={() => !loading && handleClick()}
    >
      <span className="group inline-flex items-center">
        {loading ? (
          "Sending..."
        ) : (
          <>
            Follow
            <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </span>
      <span className="group inline-flex items-center">
        <CheckIcon className="mr-2 size-4" />
        Subscribed
      </span>
    </AnimatedSubscribeButton>
  );
}
