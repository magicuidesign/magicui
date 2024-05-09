import { db } from "@/lib/db";
import { EMAIL_FROM } from "@/lib/emails/constants";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import posthog from "posthog-js";
import { sendLoginEmail } from "./emails/send-login-email";
import { upsertCustomer } from "./stripe-utils";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET!,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          userName: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    EmailProvider({
      type: "email",
      server: "",
      from: EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        token,
        provider: { server, from },
      }) => {
        await sendLoginEmail({ email, url });
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  events: {
    async createUser(message) {
      const params = {
        user: {
          name: message.user.name,
          email: message.user.email,
        },
      };

      if (message.user.email) {
        await upsertCustomer(message.user.email!, message.user.name!);
        posthog.capture("user_created", {
          distinct_id: message.user.email,
        });
        // await sendWelcomeEmail(params); // <-- send welcome email
      }
    },
  },
};
