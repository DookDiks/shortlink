import { z } from "zod";
import { MakeError } from './utils';

export type ShortLinkError = MakeError<ShortLink>;

export const ShortLinkType = z.object({
  title: z.string().max(150, "Title must be less than 150 characters").optional(),
  endpoint: z.string().min(1, "Endpoint is required").url("Invalid URL"),
  entrypoint: z
    .string()
    .regex(/^[^/]*$/, "'/' is not allow in this field")
    .regex(/^[a-zA-Z0-9]*$/, "Only English and number characters are allowed")
    .optional(),
  expireDate: z
    .date({
      required_error: "Date is required",
      invalid_type_error: "Format invalid",
    })
    .min(new Date(), "Date must be in the future"),
});

export type ShortLink = z.infer<typeof ShortLinkType>;

export const UpdateShortLinkType = z.object({
  title: z.string().max(150, "Title must be less than 150 characters"),
  endpoint: z.string().min(1, "Endpoint is required").url("Invalid URL").min(1, "Endpoint is required"),
  entrypoint: z
    .string()
    .regex(/^[^/]*$/, "'/' is not allow in this field")
    .regex(/^[a-zA-Z0-9]*$/, "Only English and number characters are allowed")
    .min(1, "Entry point is required"),
  expireDate: z
    .date({
      required_error: "Date is required",
      invalid_type_error: "Format invalid",
    })
    .min(new Date(), "Date must be in the future"),
});

export type UpdateShortLink = z.infer<typeof UpdateShortLinkType>;