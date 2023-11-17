import { capitalize } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const inter600 = fetch(
  new URL(
    `../../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`,
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const inter700 = fetch(
  new URL(
    `../../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff`,
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const image = fetch(
  new URL("../../../assets/images/og-bg-2.png", import.meta.url),
).then((res) => res.arrayBuffer());

const logo = fetch(new URL("../../../app/icon.png", import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export async function GET(req: Request) {
  const imageData = await image;
  const logoData = await logo;

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams);
  const title = capitalize((params.title || "Magic UI").replace(/-/g, " "));

  try {
    return new ImageResponse(
      (
        <div tw="flex justify-center flex-col relative w-full h-full items-center bg-white">
          <img
            tw="absolute inset-0 w-full h-full"
            alt={title}
            // @ts-ignore
            src={imageData}
          />

          {/* Lighting Effects */}
          {/* <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(circle at 0% 15%, #FFBD7A22, rgba(0,0,0,0) 40%), radial-gradient(circle at 100% 85%, #9E7AFF22,rgba(0,0,0,0) 40%)",
            }}
          ></div> */}

          <h1 tw="absolute inset-0 flex justify-center items-center mb-55 flex-row">
            <img
              tw="h-12 w-12"
              alt={title}
              // @ts-ignore
              src={logoData}
            />
            <span
              tw="ml-4"
              style={{
                background:
                  // "linear-gradient(180deg,rgba(240,238,249,.8) 0%,#E2E8FF 100%)",
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(156, 163, 175, 1) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: 40,
                letterSpacing: "-1.5px",
                ...font("Inter 700"),
              }}
            >
              Magic UI
            </span>
          </h1>

          {title && (
            <p
              style={{
                position: "absolute",
                whiteSpace: "pre-wrap",
                // background:
                //   "linear-gradient(180deg,rgba(240,238,249,.8) 0%,#E2E8FF 100%)",
                // background:
                //   "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(156, 163, 175, 0.6) 100%)",
                background:
                  "linear-gradient(315deg,#9E7AFF 0%,#FE8BBB 33.33%,#FFBD7A 66.67%,#F8EAC3 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textAlign: "center",
                fontSize: 150,
                letterSpacing: "-10px",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                ...font("Inter 600"),
              }}
            >
              {title}
            </p>
          )}

          <h1 tw="absolute inset-0 flex justify-center items-center mt-55 flex-col">
            <span
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(156, 163, 175, 1) 100%)",
                // "linear-gradient(180deg,rgba(240,238,249,.8) 0%,#E2E8FF 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: 25,
                letterSpacing: "-1.5px",
                ...font("Inter 700"),
              }}
            >
              Create magical landing pages in minutes.
            </span>
          </h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter 600",
            data: await inter600,
          },
          {
            name: "Inter 700",
            data: await inter700,
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

function font(fontFamily: string) {
  return { fontFamily };
}
