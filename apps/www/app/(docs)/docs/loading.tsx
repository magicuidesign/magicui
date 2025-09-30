import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 md:px-0">
          <div className="flex flex-col gap-8">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Title and description skeleton */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-16 w-full" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col gap-4">
              <div className="my-4">
                <Skeleton className="h-64 w-full" />
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>
      {/* Right sidebar skeleton */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-84 flex-col gap-4 overflow-hidden overscroll-none xl:flex">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="no-scrollbar overflow-y-auto px-8">
          {/* Table of contents skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-30" />
            <Skeleton className="h-3 w-34" />
            <Skeleton className="h-3 w-26" />
            <div className="h-6 w-full" />
            <Skeleton className="h-3 w-38" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="h-8" />
          {/* CTA block skeleton */}
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  )
}
