import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function DealBanner() {
  return (
    <div className="relative top-0 bg-background py-3 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="/pricing"
          className="flex flex-row items-center justify-center gap-2 text-center text-sm font-bold leading-loose text-black dark:text-white"
        >
          {/* ✨
          <span className="font-bold text-black dark:text-white">
            {" "}
            Join our new discord community <strong>here</strong>
          </span>{" "}
          ✨ */}
          🔥🔥🔥 FIRE SALE - Get $100 off TODAY ONLY
          <ExternalLink className="size-4" />
          {/* with code{" "}
          <span className="rounded-md bg-orange-400 p-1 font-bold text-black dark:text-white">
            BLOCKPARTY
          </span>{" "}
          ✨  */}
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}
