import GitHub from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [GitHub],
} satisfies NextAuthConfig;
// This is just an object without the database adaptor, not the actual next-auth instance
