import { docsConfig } from "@/config/docs"
import { Separator } from "@/components/ui/separator"
import { CommandMenu } from "@/components/command-menu"
import { DiscordLink } from "@/components/discord-link"
import { GitHubLink } from "@/components/github-link"
import { LogoButton } from "@/components/logo-button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav className="flex lg:hidden" />
          <LogoButton />
          <MainNav items={docsConfig.mainNav} className="hidden lg:flex" />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
              <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                <CommandMenu />
              </div>
              <Separator
                orientation="vertical"
                className="ml-2 hidden lg:block"
              />
              <GitHubLink />
              <Separator orientation="vertical" className="3xl:flex hidden" />
              <DiscordLink />
              <Separator orientation="vertical" />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
