"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existionToken = await getVerificationTokenByToken(token);
  if (!existionToken) {
    return { eroor: "Token donse not exist" };
  }

  const hasExpired = new Date(existionToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has Expired" };
  }

  const existingUser = await getUserByEmail(existionToken.email);

  if (!existingUser) {
    return { error: "Email dose not exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existionToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existionToken.id,
    },
  });

  return { success: "Email verified" };
};
