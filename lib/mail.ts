import VerificationMaikForLink from "@/components/emails/verification-token-mail";
import { VerificationMailForTwoFactor } from "@/components/emails/two-factor-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: VerificationMaikForLink({ link: confirmLink, label: "Click Here" }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: VerificationMaikForLink({
      link: confirmLink,
      label: "Click Here.",
    }),
  });
};

export const sendTwoFactorTokeEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two factor authentication token",
    react: VerificationMailForTwoFactor({
      token: token,
    }),
  });
};
