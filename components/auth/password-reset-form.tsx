"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordResetSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { passwordTokenVerificationAndReset } from "@/actions/password-token-verification-reset";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    if (!token) {
      console.log("I am inside the missing token condition.");
      setError("missing token");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setError("Passwords didn't match");
      return;
    }
    setError("");
    setSuccess("");

    startTransition(() => {
      passwordTokenVerificationAndReset(token, values).then((data) => {
        if (data) {
          setError(data?.error);
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your passwrod ?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  {form.formState.errors.password && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  {form.formState.errors.confirmPassword && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
