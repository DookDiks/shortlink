import { z } from "zod";

export type ServerError<T> = {
  success: false
  errors: z.ZodFormattedError<T>
  type: "zod"
} | {
  success: false
  errors: String
  type: "server"
} | {
  success: true
}

export type MakeError<T> = {
  success: boolean
  errors?: {
    [K in keyof T]?: string
  }
};

export type MakeZodError<T> = z.ZodFormattedError<T, string>