"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, fetcher } from "@/lib/utils";
import { userNameSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import * as z from "zod";

interface UserProfileFormProps extends HTMLAttributes<HTMLFormElement> {
  // user: Pick<User, "id" | "name">;
}

type FormData = z.infer<typeof userNameSchema>;

export function UserProfileForm({ className, ...props }: UserProfileFormProps) {
  const { data: session, status } = useSession();
  const { data, isLoading } = useSWR(
    status === "authenticated" && "/api/me",
    fetcher,
  );

  const user = data?.user || null;

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/users/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      toast.error("Something went wrong.", {
        description: "Your profile was not updated. Please try again.",
      });
    }

    toast.success("Your profile has been updated.");

    router.refresh();
  }

  if (status === "loading") return null;
  if (isLoading) return null;
  if (!user) return null;

  console.log(user);

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Your Name</CardTitle>
            <CardDescription>
              Please enter your full name or a display name you are comfortable
              with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className="w-[400px]"
                        size={32}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your display name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <Button
              type="button" // This already ensures the button does not trigger form submit
              className="gap-2"
              onClick={async (e) => {
                e.preventDefault(); // Explicitly prevent form submission
                await signIn("github", {
                  callbackUrl: "/dashboard/settings",
                });
              }}
            >
              Connect to Github
              <GitHubLogoIcon className="h-4 w-4" />
            </Button> */}
          </CardContent>
          <CardFooter>
            <button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
