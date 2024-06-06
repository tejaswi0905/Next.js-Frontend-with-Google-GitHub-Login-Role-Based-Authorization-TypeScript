import * as z from "zod";

export const PasswordResetSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(
    z.string().min(6, {
      message:
        "The code you entered is invalid. Please enter a 6-character code.",
    })
  ),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
});
