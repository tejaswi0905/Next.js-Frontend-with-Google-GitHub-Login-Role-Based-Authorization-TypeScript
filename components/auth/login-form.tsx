"use client";

//Todo seperate the logic of 2FA component into a seperate file.

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
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

import { login } from "@/actions/login"; //This is a server action. We are using nextjs server actions not api routes for this project.

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    console.log({
      values,
    });

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data) {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            if (data?.success) {
              form.reset();
              setSuccess(data.success);
            }
            if (data?.twoFactor) {
              setShowTwoFactor(true);
            }
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {showTwoFactor && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123456"
                        disabled={isPending}
                      />
                    </FormControl>
                    {form.formState.errors.code && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          )}
          {!showTwoFactor && (
            <>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      {form.formState.errors.email && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
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
                          type="Password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <Button size="sm" variant="link" className="px-0">
            <Link href="/auth/reset">Forgot Password ?</Link>
          </Button>
          <FormError message={error || urlError}></FormError>
          <FormSuccess message={success}></FormSuccess>
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm" : "login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
