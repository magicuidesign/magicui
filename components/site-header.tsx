import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import NumberTicker from "@/registry/components/magicui/number-ticker";
import { StarIcon } from "@heroicons/react/24/solid";
import { User } from "next-auth";
import Link from "next/link";

interface SiteHeaderProps {
  user?: User;
}

export async function SiteHeader({ user }: SiteHeaderProps) {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/magicuidesign/magicui",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      next: {
        revalidate: 3600,
      },
    },
  )
    .then((res) => res.json())
    .catch(() => ({ stargazers_count: 300 }));

  return (
    <header
      className={cn(
        "supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full  bg-background/40 backdrop-blur-lg",
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <Link
            className={cn(
              buttonVariants(),
              "hidden max-w-52 gap-2 overflow-hidden whitespace-pre md:flex",
              "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
            )}
            target="_blank"
            href={siteConfig.links.github}
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
            <Icons.gitHub className="h-4 w-4" />
            Star on GitHub
            <div className="hidden items-center gap-1 text-sm text-gray-500 md:flex">
              <StarIcon className="h-4 w-4 transition-all duration-300 group-hover:text-yellow-300" />
              <NumberTicker
                value={stars}
                className="font-display font-medium text-white"
              />
            </div>
          </Link>
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center gap-2">
            <ModeToggle />
          </nav>
        </div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </header>
  );
}
