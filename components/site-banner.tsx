import Link from "next/link";

export function SiteBanner() {
  return (
    <div className="relative top-0 bg-background py-3 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="/discord"
          className="text-center text-sm leading-loose text-muted-foreground"
        >
          ✨
          <span className="font-bold text-black dark:text-white">
            {" "}
            Join our new discord community <strong>here</strong>
          </span>{" "}
          ✨
          {/* Get{" "}
          <span className="font-bold text-black dark:text-white">
            $30 off
          </span>{" "}
          with code{" "}
          <span className="rounded-md bg-orange-400 p-1 font-bold text-black dark:text-white">
            BLOCKPARTY
          </span>{" "}
          ✨ */}
        </Link>
        {/* <Link
          href="/pricing"
          className="text-center text-sm leading-loose text-muted-foreground"
        >
          ✨
          <span className="font-bold text-black dark:text-white">
            {" "}
            New Page Sections Launch Sale -{" "}
          </span>{" "}
          Get{" "}
          <span className="font-bold text-black dark:text-white">
            $30 off
          </span>{" "}
          with code{" "}
          <span className="rounded-md bg-orange-400 p-1 font-bold text-black dark:text-white">
            BLOCKPARTY
          </span>{" "}
          ✨
        </Link> */}
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}
