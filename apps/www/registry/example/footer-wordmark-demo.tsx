import { FooterWordmark } from "@/registry/magicui/footer-wordmark"

const columns = [
  { title: "Product", links: ["Scheduling", "Integrations", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Blog"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
]

export default function FooterWordmarkDemo() {
  return (
    <div className="flex min-h-[calc(100svh-3rem)] w-5xl max-w-full flex-col justify-end">
      <footer className="bg-background text-foreground text-xs sm:text-sm">
        <div className="flex flex-col gap-6 pb-6 sm:flex-row sm:justify-between sm:pb-8">
          <div className="flex flex-col justify-between gap-2">
            <p>A calmer calendar for busy teams.</p>
            <p className="text-muted-foreground">© 2026 Meridian Labs, Inc.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            {columns.map((column) => (
              <div key={column.title} className="space-y-3">
                <h3 className="font-medium">{column.title}</h3>
                <ul className="text-muted-foreground space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-border border-t pt-6 sm:pt-8">
          <FooterWordmark>Meridian</FooterWordmark>
        </div>
      </footer>
    </div>
  )
}
