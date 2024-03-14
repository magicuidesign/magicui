import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const BlockWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "not-prose relative overflow-hidden rounded-xl border bg-background p-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BlockWrapper;
