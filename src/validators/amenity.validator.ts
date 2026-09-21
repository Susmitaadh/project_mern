import * as z from "zod";

export const amenityValidator = z.object({
  name: z
    .string()
    .trim()
    .min(3, "At least 3 characters are required"),

  description: z
    .string()
    .trim()
    .min(10, "At least 10 characters are required"),

  logo: z.object({
    url: z.string().url("Invalid image URL"),
    public_id: z.string().min(1, "Public ID is required"),
  }),

  user: z
    .string()
    .min(1, "User is required"),
});
