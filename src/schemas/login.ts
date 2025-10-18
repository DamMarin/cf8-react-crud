import {z} from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {error: "Username is invalid"}),
  password: z.string().min(1, {error: "Password is invalid"}),
});

export type LoginFields = z.infer<typeof loginSchema>;