import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ ...props }: AvatarProps) {
  return (
    <Avatar {...props}>
        <AvatarImage alt="Picture" src={"https://github.com/dillionverma"} />
        <AvatarFallback>
          <span className="sr-only">{"Dillion Verma"}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
    </Avatar>
  );
}
