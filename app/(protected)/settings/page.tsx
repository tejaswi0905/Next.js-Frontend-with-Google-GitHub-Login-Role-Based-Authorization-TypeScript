"use client";

import { logout } from "@/actions/log-out";
import { useCurrentUser } from "@/app/hooks/use-current-userr";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        sign out!
        {JSON.stringify(user)}
      </button>
    </div>
  );
};

export default SettingsPage;
