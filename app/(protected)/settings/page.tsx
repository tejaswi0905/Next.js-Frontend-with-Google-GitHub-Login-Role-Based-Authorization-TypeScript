"use client";

import { logout } from "@/actions/log-out";
import { useCurrentUser } from "@/app/hooks/use-current-userr";

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        sign out!
      </button>
    </div>
  );
};

export default SettingsPage;
