import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import { siteConfig } from "@/config/site";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Link from "next/link";

interface SiteHeaderProps {
  user?: User;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/80 sticky top-0 z-40 w-full bg-[radial-gradient(transparent_1px,white_1px)] backdrop-blur-sm [background-size:8px_8px] dark:bg-[radial-gradient(transparent_1px,#09090B_1px)]">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center gap-2">
            {/* <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.twitter className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />

            {user && (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            )}

            {!user && (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4",
                  )}
                >
                  Login
                </Link>
                <Link
                  className={cn(
                    buttonVariants({
                      size: "sm",
                    }),
                    "hidden gap-2 whitespace-pre md:flex",
                    "group relative w-full gap-1 overflow-hidden rounded-sm text-sm font-semibold tracking-tighter",
                    "transform-gpu rounded-sm ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                  )}
                  href={env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK}
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-24 dark:bg-black" />
                  {/* <Icons.logo className="h-4 w-4" /> */}
                  Buy Now
                  {/* <div className="hidden items-center gap-1 text-sm text-gray-500 md:flex">
                <StarIcon className="h-4 w-4 transition-all duration-300 group-hover:text-yellow-300" />
              </div> */}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
      <div className="absolute bottom-0 h-px w-full bg-[radial-gradient(50%_100%_at_50%_100%,rgba(0,0,0,.12)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(50%_100%_at_50%_100%,rgba(255,255,255,.32)_0%,rgba(255,255,255,0)_100%)]" />
    </header>
  );
}
