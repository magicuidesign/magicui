"use client";

import { Crisp } from "crisp-sdk-web";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function CrispChat() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CRISP_CHAT_ID) return;

    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_CHAT_ID, {
      autoload: false,
    });

    if (!session?.user) {
      Crisp.chat.show();
    } else {
      Crisp.chat.hide();
    }

    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email);
      Crisp.user.setNickname(session.user.name || session.user.email);
    }
  }, [session]);

  return null;
}
