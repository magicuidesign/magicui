"use client";

import { Crisp } from "crisp-sdk-web";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function CrispChat() {
  const { data: session } = useSession();

  console.error("NEXT PUB", process.env.NEXT_PUBLIC_CRISP_CHAT_ID);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CRISP_CHAT_ID) return;

    console.error("Setting up crisp");
    console.error(process.env.NEXT_PUBLIC_CRISP_CHAT_ID);

    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_CHAT_ID, {
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
