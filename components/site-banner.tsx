import Link from "next/link";

export function SiteBanner() {
  return (
    <div className="relative top-0 bg-background py-3 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="/pricing"
          className="text-center text-sm leading-loose text-muted-foreground"
        >
          ✨<span className="font-bold text-white"> Black Friday Sale - </span>{" "}
          Get{" "}
          <span className="font-bold text-white">
            60% off on Friday November 24th ONLY
          </span>{" "}
          with code{" "}
          <span className="rounded-md bg-green-600 p-1 font-bold text-white">
            ONEDAYSPECIAL
          </span>{" "}
          ✨
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}
