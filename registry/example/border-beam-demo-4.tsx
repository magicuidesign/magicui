import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/registry/magicui/border-beam";

export default function Component() {
  return (
    <Button className="relative overflow-hidden" size="lg" variant="outline">
      Buy Now
      <BorderBeam
        size={40}
        initialOffset={20}
        className="from-transparent via-yellow-500 to-transparent"
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      />
    </Button>
  );
}
