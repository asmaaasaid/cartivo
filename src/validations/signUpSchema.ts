import z from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().min(1, { message: "email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+|[\]\\:";'<>?,./].*/, {
        message: "password shoul contain at least 1 special charactar",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "confrim password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "password and confirm password doesn't match",
    path: ["confirmPassword"],
  });
type signUpType = z.infer<typeof signUpSchema>;

export {signUpSchema, type signUpType}