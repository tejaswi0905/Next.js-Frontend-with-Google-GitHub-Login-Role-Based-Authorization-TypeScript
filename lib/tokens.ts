import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidV4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60); //The token will expire in one hour.

  const existingToke = await getVerificationTokenByEmail(email);

  if (existingToke) {
    await db.verificationToken.delete({
      where: {
        id: existingToke.id,
      },
    });
  }

  const verificationToken = db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
