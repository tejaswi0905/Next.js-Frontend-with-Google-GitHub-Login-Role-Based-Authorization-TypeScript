import { Html } from "@react-email/components";

interface VerificationMailForTwoFactorProps {
  token: string;
}

export const VerificationMailForTwoFactor = ({
  token,
}: VerificationMailForTwoFactorProps) => {
  return (
    <Html>
      <p>Your verification token is {token}</p>
    </Html>
  );
};
