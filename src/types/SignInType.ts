import { z } from "zod";
import { MakeError } from "@/types/utils";

export type SignInError = MakeError<SignIn>;

export const SignInSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
  })

export type SignIn = z.infer<typeof SignInSchema>;
