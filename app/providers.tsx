"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const session = useSession();
  return <SessionProvider>{children}</SessionProvider>;
};
