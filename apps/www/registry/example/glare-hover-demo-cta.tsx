import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlareHover } from "@/registry/magicui/glare-hover"

export default function Cta() {
  return (
    <GlareHover className="rounded-xl" color="#505050" duration={700}>
      <Card className="w-full text-center">
        <CardHeader>
          <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            14-day free trial · No card required
          </p>
          <CardTitle className="text-2xl tracking-tight">
            Ready to get started?
          </CardTitle>
          <CardDescription className="mx-auto max-w-sm">
            Join 4,000+ teams already using our platform to ship faster.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center gap-2">
          <Button>Start free trial</Button>
          <Button variant="outline">View demo</Button>
        </CardFooter>
      </Card>
    </GlareHover>
  )
}
