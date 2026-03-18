import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { TubesBackground } from "@/registry/magicui/tubes-background"

export default function TubesBackgroundDemo() {
  return (
    <TubesBackground className="min-h-[400px]">
      <Card className="w-80">
        <CardContent className="flex flex-col gap-2 p-4">
          <CardTitle>Interactive 3D Tubes</CardTitle>
          <CardDescription>
            A Three.js powered animated background with interactive tubes that
            follow your cursor. Click anywhere to randomize the colors.
          </CardDescription>
        </CardContent>
      </Card>
    </TubesBackground>
  )
}
