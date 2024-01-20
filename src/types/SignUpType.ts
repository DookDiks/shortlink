import { z } from "zod";

export type SignUpError = {
  success: boolean
  errors?: {
    email?: string
    password?: string
    confirmPassword?: string
  }
};

export const SignUpSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUp = z.infer<typeof SignUpSchema>;