import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/registry/magicui/border-beam";
import { Play, SkipBack, SkipForward } from "lucide-react";

export default function MusicPlayer() {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
        <CardDescription>Stairway to Heaven - Led Zeppelin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="h-1 w-full rounded-full bg-secondary">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <div className="flex w-full justify-between text-sm text-muted-foreground">
            <span>2:45</span>
            <span>8:02</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipBack className="size-4" />
        </Button>
        <Button size="icon" className="rounded-full">
          <Play className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipForward className="size-4" />
        </Button>
      </CardFooter>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-blue-500 to-transparent"
      />
    </Card>
  );
}
