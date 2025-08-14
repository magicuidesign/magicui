"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { useTheme } from "next-themes";

export default function ShineBorderDemo3() {
  const theme = useTheme();
  return (
    <Card className="relative overflow-hidden">
      <ShineBorder
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        duration={15}
        fadein={true}
        fadeoutAfter={10}
        fadeinDuration={2}
        fadeoutDuration={2}
        delayLoad={2}
        fadeout={true}
      />
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}
