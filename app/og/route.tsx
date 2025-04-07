import { ImageResponse } from "next/og";

import { Icons } from "@/components/icons";

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const [fonts] = await Promise.all([loadAssets()]);

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full bg-white text-black"
        style={{ fontFamily: "Geist Sans" }}
      >
        <div tw="flex border absolute border-neutral-200 border-dashed inset-y-0 left-16 w-[1px]" />
        <div tw="flex border absolute border-neutral-200 border-dashed inset-y-0 right-16 w-[1px]" />
        <div tw="flex border absolute border-neutral-200 inset-x-0 h-[1px] top-16" />
        <div tw="flex border absolute border-neutral-200 inset-x-0 h-[1px] bottom-16" />
        {(title || description) && (
          <div tw="flex absolute flex-row items-center justify-center bottom-24 right-24 text-white">
            <Icons.logo width={48} height={48} />
            <div tw="text-black flex text-[32px] font-semibold tracking-tight ml-2">
              Magic UI
            </div>
          </div>
        )}
        <div tw="flex flex-col absolute justify-center items-center inset-0 p-24 w-full h-full">
          {title || description ? (
            <div tw="flex flex-col items-center justify-center text-center w-full h-full">
              <div tw="tracking-tight flex flex-col justify-center text-black text-balance font-semibold text-[80px]">
                {title}
              </div>
              <div tw="text-[40px] text-gray-600 mt-6 text-balance font-normal">
                {description}
              </div>
            </div>
          ) : (
            <div tw="flex flex-col items-center justify-center text-center w-full h-full">
              <div tw="flex flex-row items-center justify-center space-x-4">
                <Icons.logo width={48} height={48} />
                <div tw="text-black flex text-[32px] font-semibold tracking-tight ml-2">
                  Magic UI
                </div>
              </div>
              <div tw="text-black flex text-[80px] font-semibold tracking-tight">
                Modern Next.js Templates
              </div>
              <div tw="text-gray-600 text-2xl flex">
                <p>
                  Built with React, Typescript, shadcn/ui, Tailwind CSS, and
                  Motion.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts,
    },
  );
}
