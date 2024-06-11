import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono as FontMono } from "next/font/google";

export const fontSans = GeistSans;

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
