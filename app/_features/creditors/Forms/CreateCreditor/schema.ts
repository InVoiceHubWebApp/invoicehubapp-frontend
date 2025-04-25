import { CreditorTypeEnum } from "@/app/_types/creditors";
import { z } from "zod";

export const creditorSchema = z
  .object({
    due_date: z
      .string({ required_error: "A data de vencimento é obrigatória" })
      .refine((value) => /^(0[1-9]|[12][0-9]|3[01])$/.test(value), {
        message: "Dia inválido",
      }),
    creditor_type: z.nativeEnum(CreditorTypeEnum, {
      required_error: "O tipo de credor é obrigatório",
    }),
    name: z
      .string({ required_error: "O título do credor é obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
    limit_value: z.string().optional(),
    user_as_creditor_id: z.string().optional(),
  })
  .refine(
    (data) =>
      data.creditor_type !== "USER" ||
      (data.creditor_type == "USER" && !!data.user_as_creditor_id),
    {
      path: ["user_as_creditor_id"],
      message: "É necessário fornecer um usuário",
    },
  );

export type CreditorSchemaType = z.infer<typeof creditorSchema>;
