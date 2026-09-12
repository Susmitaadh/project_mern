import * as z from "zod";

export const loginValidator = z.object({
  // body
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
  // params
  // query
});
