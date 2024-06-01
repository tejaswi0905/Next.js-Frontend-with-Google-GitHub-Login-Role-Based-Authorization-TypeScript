"use client";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "./card-wrapper";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

import { newVerification } from "@/actions/new-verification";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Somehtin went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  });
  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        showSocial={false}
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && <BeatLoader></BeatLoader>}
          <FormSuccess message={success}></FormSuccess>
          <FormError message={error}></FormError>
        </div>
      </CardWrapper>
    </div>
  );
};
