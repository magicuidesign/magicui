import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

// @see ./lib/auth
export default NextAuth(authOptions);
