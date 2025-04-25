import { z } from "zod";

export const userRegister = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
    lastname: z
      .string({ required_error: "O sobrenome é obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
    email: z
      .string({ required_error: "O e-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    username: z
      .string({ required_error: "O campo de usuário é obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(1, { message: "Campo obrigatório" }),
    confirmPassword: z
      .string({ required_error: "Confirmação de senha obrigatória" })
      .min(1, { message: "Campo obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // path of error
  });

export type UserRegisterType = z.infer<typeof userRegister>;
