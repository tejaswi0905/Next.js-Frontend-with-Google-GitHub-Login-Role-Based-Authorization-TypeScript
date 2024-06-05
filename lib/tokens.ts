import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

import { v4 as uuidV4 } from "uuid";
import crypto from "crypto";
import { db } from "./db";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  const existingToke = await getPasswordResetTokenByEmail(email);
  if (existingToke) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToke.id,
      },
    });
  }

  const passwordVerificationToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordVerificationToken;
};

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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 5); // Token expiers in 5 mins.

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};
