import LoginLink from "@/emails/LoginLink";
import { resend } from "@/lib/resend";
import { EMAIL_FROM } from "./constants";

export async function sendLoginEmail({
  name,
  email,
  url,
}: {
  name?: string | null | undefined;
  email: string | null | undefined;
  url: string;
}) {
  const emailTemplate = LoginLink({ loginLink: url });
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email as string,
      subject: "Welcome to Magic UI!",
      react: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
