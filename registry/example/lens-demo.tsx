/* eslint-disable @next/next/no-img-element */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lens } from "../magicui/lens";
import { Button } from "@/components/ui/button";

export default function LensDemo() {
  return (
    <div className="relative justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <Lens>
            <img
              src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image placeholder"
              width={500}
              height={500}
              className="rounded-2xl"
            />
          </Lens>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl">Your next camp</CardTitle>
          <CardDescription>
            See our latest and best camp destinations all across the five
            continents of the globe.
          </CardDescription>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button>Let&apos;s go</Button>
          <Button variant="secondary">Another time</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
