import { Analytics } from "@/components/analytics";
import PosthogIdentify from "@/components/posthog-identify";
import { PHProvider } from "@/components/posthog-provider";
import SessionProvider from "@/components/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fontSans } from "@/lib/fonts";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Magic UI",
  description:
    "Beautiful UI components and templates to make your landing page look stunning.",
  image: absoluteUrl("/api/og"),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <PHProvider>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <TooltipProvider>
                {children}
                <PosthogIdentify />
                <Toaster />
                <Analytics />
              </TooltipProvider>
            </ThemeProvider>
          </SessionProvider>
        </PHProvider>
      </body>
    </html>
  );
}
