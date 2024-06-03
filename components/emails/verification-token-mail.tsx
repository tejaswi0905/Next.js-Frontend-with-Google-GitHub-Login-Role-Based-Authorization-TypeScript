import * as React from "react";
import { Html, Link } from "@react-email/components";

interface VerificationMailProps {
  link: string;
  label: string;
}

export default function VerificationMail({
  link,
  label,
}: VerificationMailProps) {
  return (
    <Html>
      <p>
        To verify you email <Link href={link}>{label}</Link>. Or copy paste the
        above link in your URL. {link}
      </p>
    </Html>
  );
}
