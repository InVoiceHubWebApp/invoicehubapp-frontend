import { InvoiceTypeEnum } from '@/app/_types/invoices';
import { z } from 'zod';

const externalPaymentsSchema = z.object({
  id: z.number().nullable().optional(),
  creditor_id: z
    .string({
      required_error: 'Selecione um devedor'
    })
    .min(1, { message: 'Selecione um devedor' }),
  value: z
    .string({ required_error: 'Valor obrigatório' })
    .min(1, { message: 'Valor obrigatório' })
    .refine(
      (value) => Number(value.replace(/\./g, '').replace(',', '.')) != 0,
      { message: 'O valor não pode ser 0' }
    )
});

export const invoiceSchema = z
  .object({
    creditor_id: z
      .string({
        required_error: 'É obrigatório selecionar um credor'
      })
      .min(1, { message: 'É obrigatório selecionar um credor' }),
    purchase_date: z.date(),
    title: z
      .string({ required_error: 'O título da compra é obrigatório' })
      .min(1, { message: 'O título da compra é obrigatório' }),
    value: z
      .string({ required_error: 'O valor da compra é obrigatório' })
      .min(1, { message: 'O valor da compra é obrigatório' })
      .refine(
        (value) => Number(value.replace(/\./g, '').replace(',', '.')) != 0,
        { message: 'O valor não pode ser 0' }
      ),
    installments: z.string().optional(),
    payment_type: z.nativeEnum(InvoiceTypeEnum, {
      required_error: 'O tipo da compra é obrigatório'
    }),
    paid: z.boolean(),
    external_payments: z.array(externalPaymentsSchema)
  })
  .refine(
    (data) =>
      data.payment_type !== 'INSTALLMENT' ||
      (data.payment_type === 'INSTALLMENT' && !!data.installments),
    {
      path: ['installments'],
      message: 'O número de parcelas é obrigatório'
    }
  )
  .refine(
    (data) =>
      data.external_payments.length == 0 ||
      data.external_payments.reduce(
        (acc, cur) =>
          acc + cur.value
            ? Number(cur.value.replace(/\./g, '').replace(',', '.'))
            : 0,
        0
      ) <= Number(data.value.replace(/\./g, '').replace(',', '.')),
    {
      path: ['external_payments'],
      message:
        'O valor total compartilhado não pode ser maior que o valor da compra'
    }
  );
export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
