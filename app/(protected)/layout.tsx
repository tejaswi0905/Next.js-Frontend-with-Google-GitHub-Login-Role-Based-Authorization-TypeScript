interface ProtectedLayoutProps {
  children: React.ReactNode;
}
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-b from-sky-400 to-blue-800 bg-sky-400">
      <SessionProvider session={session}>
        <Navbar></Navbar>
        {children}
      </SessionProvider>
    </div>
  );
};

export default ProtectedLayout;
