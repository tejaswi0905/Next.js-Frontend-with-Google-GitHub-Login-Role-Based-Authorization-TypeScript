"use server";

import { currentRole } from "@/lib/user-session";
import { UserRole } from "@prisma/client";

export const adminOnlyAction = async () => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return { success: "success" };
  } else {
    return { error: "error" };
  }
};
