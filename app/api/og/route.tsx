import { capitalize } from "@/lib/utils";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const interSemiBold = fetch(
  new URL("../../../assets/fonts/Inter-SemiBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const image = fetch(
  new URL("../../../assets/images/og-bg.png", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  const imageData = await image;

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams);
  const title = capitalize((params.title || "Magic UI").replace(/-/g, " "));

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* @ts-ignore */}
          <img
            // @ts-ignore
            src={imageData}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />

          {/* Lighting Effects */}
          {/* <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(circle at 0% 15%, rgba(171, 112, 243, 0.1), rgba(0,0,0,0) 40%), radial-gradient(circle at 100% 85%, rgba(233, 132, 23, 0.1),rgba(0,0,0,0) 40%)",
            }}
          ></div> */}

          {title && (
            <p
              style={{
                fontSize: 150,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(156, 163, 175, 0.6) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {title}
            </p>
          )}
          <h1 tw="text-gray-300 font-medium bg-clip-text bg-gradient-to-b from-white to-gray-300/90 mx-auto text-center text-3xl">
            <span
              style={{
                letterSpacing: 1,
                opacity: 0.8,
                background:
                  "linear-gradient(90deg, rgba(171, 112, 243, 1) 0%, rgba(238, 90, 132, 1) 50%, rgba(233, 132, 23, 1) 100%)",
                backgroundClip: "text",
                // @ts-ignore
                "-webkit-background-clip": "text",
                color: "transparent",
              }}
            >
              Beautifully Crafted React + Tailwind CSS components
            </span>
          </h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
