interface BackButtonProps {
  label: string;
  href: string;
}

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="flex flex-center w-full">
      <Button variant="link" className="font-normal w-full" size="sm" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};
