"use client";

import { Crisp } from "crisp-sdk-web";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function CrispChat() {
  const { data: session } = useSession();

  useEffect(() => {
    Crisp.configure("5a280d36-3e81-4bbe-89a7-787f6b34b481", {
      autoload: false,
    });

    // if (!session?.user) {
    Crisp.chat.show();
    // } else {
    //   Crisp.chat.hide();
    // }

    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email);
      Crisp.user.setNickname(session.user.name || session.user.email);
    }

    console.error("Crisp should be setup");
  }, [session]);

  return null;
}
