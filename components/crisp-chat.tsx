"use client";

import { Crisp } from "crisp-sdk-web";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function CrispChat({ isNewVisitor }: { isNewVisitor: boolean }) {
  const { data: session } = useSession();

  useEffect(() => {
    Crisp.configure("5a280d36-3e81-4bbe-89a7-787f6b34b481", {
      autoload: false,
    });

    Crisp.chat.show();

    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email);
      Crisp.user.setNickname(session.user.name || session.user.email);
    }

    if (!localStorage.getItem("crispMessageShown")) {
      const timeoutId1 = setTimeout(() => {
        Crisp.message.show("text", "hi there! can i help with anything?");
        localStorage.setItem("crispMessageShown", "true");
      }, 1000);

      // Cleanup function to clear timeouts
      return () => {
        clearTimeout(timeoutId1);
      };
    }
  }, [session, isNewVisitor]);

  return null;
}
