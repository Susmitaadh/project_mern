import * as z from "zod";

export const loginValidator = z.object({
  //* body
  body: z.object({
    email: z.email('Invalid email format'),
    password: z.string('Password must be a string.').optional(),
  }),
  //* params
  //* query
});

//* register
