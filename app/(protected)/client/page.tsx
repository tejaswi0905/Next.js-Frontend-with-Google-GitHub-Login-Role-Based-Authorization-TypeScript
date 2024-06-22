"use client";

import { UserInfo } from "@/components/user-info";
import { useSession } from "next-auth/react";

const ClientPage = () => {
  const session = useSession();

  return <UserInfo label="Client Page" user={session.data?.user}></UserInfo>;
};

export default ClientPage;
