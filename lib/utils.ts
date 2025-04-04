import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { env } from "process";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function constructMetadata({
  title = "Magic UI - Modern React + Tailwind CSS components & Templates",
  description = "Magic UI is a curated collection of the best landing page components built using React + Tailwind CSS + Motion",
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title,
    description,
    keywords: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Landing Page",
      "Components",
      "Next.js",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@dillionverma",
    },
    icons: "/favicon.ico",
    metadataBase: new URL("https://pro.magicui.design"),
    authors: [
      {
        name: "dillionverma",
        url: "https://twitter.com/dillionverma",
      },
    ],
    creator: "dillionverma",
    // themeColor: [
    //   { media: "(prefers-color-scheme: light)", color: "white" },
    //   { media: "(prefers-color-scheme: dark)", color: "black" },
    // ],
    ...props,
  };
}

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_APP_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_APP_URL &&
    process.env.NEXT_PUBLIC_APP_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_APP_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          "http://localhost:3003/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};
