"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { adminOnlyAction } from "@/actions/role-gate-action";

const AdminPage = () => {
  const handleOnClickAdminRoute = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        console.log("OKAY");
      } else {
        console.log("FORBIDDEN");
      }
    });
  };

  const handleOnclickAdminServerAction = () => {
    adminOnlyAction().then((data) => {
      if (data.error) {
        console.log("Not allowed");
      }
      if (data.success) {
        console.log("Okay..");
      }
    });
  };
  return (
    <div>
      <Card className="w-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Admin Page</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message="You are allowed to view this page"></FormSuccess>
          </RoleGate>
          <div className="flex flex-row font-semibold items-center justify-between border m-1 rounded-lg p-3 shadow-sm">
            <p>Admin only allowed Api page Route</p>
            <Button
              onClick={() => {
                handleOnClickAdminRoute();
              }}
              variant="default"
            >
              Test Link
            </Button>
          </div>
          <div className="flex flex-row font-semibold items-center justify-between border m-1 rounded-lg p-3 shadow-sm">
            <p>Admin only allowed Server Action</p>
            <Button
              onClick={() => {
                handleOnclickAdminServerAction();
              }}
              variant="default"
            >
              Test Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
