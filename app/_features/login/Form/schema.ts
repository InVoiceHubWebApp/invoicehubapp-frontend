import { z } from "zod";

export const userLogin = z.object({
  username: z
    .string({ required_error: "O campo de usuário é obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(1, { message: "Campo obrigatório" }),
});

export type UserLoginType = z.infer<typeof userLogin>;
