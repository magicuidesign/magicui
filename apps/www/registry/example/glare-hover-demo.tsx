import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlareHover } from "@/registry/magicui/glare-hover"

export default function PricingCard() {
  return (
    <GlareHover className="rounded-xl" duration={600}>
      <Card className="w-[340px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pro</CardTitle>
            <Badge>Popular</Badge>
          </div>
          <CardDescription>For teams that need more.</CardDescription>
          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-4xl font-semibold tracking-tight">$49</span>
            <span className="text-muted-foreground text-sm">/mo</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5">
          {[
            "Unlimited projects",
            "Team collaboration",
            "Advanced analytics",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M12.5 3.5L6 10L2.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {f}
            </div>
          ))}
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle
                cx="7.5"
                cy="7.5"
                r="1.5"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
            SSO (coming soon)
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get started</Button>
        </CardFooter>
      </Card>
    </GlareHover>
  )
}
