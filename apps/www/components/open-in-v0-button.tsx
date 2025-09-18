import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OpenInV0Button({
  name,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  name: string;
}) {
  return (
    <Button
      size="sm"
      asChild
      className={cn("h-[1.8rem] gap-1", className)}
      {...props}
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${process.env.NEXT_PUBLIC_APP_URL}/r/${name}.json`}
        target="_blank"
      >
        Open in <Icons.v0 className="size-5" />
      </a>
    </Button>
  );
}
