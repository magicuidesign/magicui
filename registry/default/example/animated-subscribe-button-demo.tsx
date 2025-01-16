import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { AnimatedSubscribeButton } from "@/registry/default/magicui/animated-subscribe-button";

export default function AnimatedSubscribeButtonDemo() {
  return (
    <AnimatedSubscribeButton className="w-36">
      <span className="group inline-flex items-center">
        Follow
        <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="group inline-flex items-center">
        <CheckIcon className="mr-2 size-4" />
        Subscribed
      </span>
    </AnimatedSubscribeButton>
  );
}
