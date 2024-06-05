"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { PasswordResetSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

export const passwordTokenVerificationAndReset = async (
  token: string,
  values: z.infer<typeof PasswordResetSchema>
) => {
  const passwordResetToken = await getPasswordResetTokenByToken(token);
  if (!passwordResetToken) {
    return { error: "Invlid (or) missing token" };
  }

  const hasExpired = new Date(passwordResetToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired" };
  }
  const validatedFields = PasswordResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const existingUser = await getUserByEmail(passwordResetToken.email);
  if (!existingUser) {
    return { error: "Email dosen't exist" };
  }

  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return { error: "Passwords don't match" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: passwordResetToken.id,
    },
  });
  return { success: "Password Reset Successful." };
};
