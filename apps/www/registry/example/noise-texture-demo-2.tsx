import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NoiseTexture } from "@/registry/magicui/noise-texture"

export default function NoiseTextureDemo2() {
  return (
    <div className="flex justify-center p-4">
      <Card className="bg-card/80 relative w-full max-w-md overflow-hidden border">
        <NoiseTexture noiseOpacity={0.45} />
        <CardHeader className="relative z-10 space-y-1 pb-4">
          <CardTitle className="text-xl">The weekly digest</CardTitle>
          <CardDescription>
            One email on Sundays—new components, tips, and changelog highlights.
            No spam, unsubscribe anytime.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="newsletter-email">Email</Label>
            <Input
              id="newsletter-email"
              autoComplete="email"
              placeholder="you@company.com"
              type="email"
            />
          </div>
          <Button className="w-full" type="button">
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
