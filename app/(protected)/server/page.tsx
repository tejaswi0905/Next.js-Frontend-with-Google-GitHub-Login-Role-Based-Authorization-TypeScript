import { UserInfo } from "@/components/user-info";
import { auth } from "@/auth";

const ServerPage = async () => {
  const session = await auth();
  return <UserInfo label="Server Page" user={session?.user}></UserInfo>;
};

export default ServerPage;
