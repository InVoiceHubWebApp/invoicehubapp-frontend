'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { invoiceSchema, type InvoiceSchemaType } from './schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { DatePicker, SelectSearch } from '@/app/_components';
import { Input } from '@/components/ui/input';
import { maskCash, maskNumber } from '@/lib/formatter';
import { Checkbox } from '@/components/ui/checkbox';
import { HandCoins, Loader2, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { create, update } from './action';
import { useToast } from '@/lib/toast';
import { useNavigation } from '@/lib/navigation';
import type {
  Invoice,
  InvoicePaymentStatus,
  InvoiceTypeEnum
} from '@/app/_types/invoices';
import { useMemo } from 'react';
import { useCreditors } from '@/hooks/use-creditors';

const paymentsType = [
  { label: 'Parcelado', value: 'INSTALLMENT' },
  { label: 'À Vista', value: 'CASH' },
  { label: 'Fixo', value: 'FIXED' }
];

const DEFAULTVALUES = {
  creditor_id: '',
  title: '',
  value: '',
  installments: '',
  purchase_date: new Date(),
  paid: false
};

type FormProps = { defaultValues?: Invoice };

export function Form({ defaultValues }: FormProps) {
  const values = useMemo(() => {
    if (!defaultValues) return defaultValues;
    const paid = defaultValues.paid_status == 'PAID';
    const payments = defaultValues.external_payments ?? [];
    const externalPayments = payments.map((payment) => {
      return {
        id: payment.id,
        creditor_id: `${payment.responsible_creditor.id}`,
        value: maskCash(payment.value.toFixed(2))
      };
    });
    return {
      ...defaultValues,
      paid,
      purchase_date: new Date(defaultValues.purchase_date),
      creditor_id: `${defaultValues.creditor_id}`,
      value: maskCash(defaultValues.value.toFixed(2)),
      payment_type: defaultValues.payment_type as InvoiceTypeEnum,
      external_payments: externalPayments,
      installments: defaultValues.installments
        ? `${defaultValues.installments}`
        : ''
    };
  }, [defaultValues]);

  const form = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: values ?? DEFAULTVALUES
  });

  const {
    formState: { isSubmitting, isDirty, errors }
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'external_payments'
  });

  const { feedback } = useToast();
  const { router } = useNavigation();

  const onSubmit = async (data: InvoiceSchemaType) => {
    const external_payments = data.external_payments
      .filter((ep) => ep.creditor_id && ep.value)
      .map((ep) => {
        return {
          id: ep.id,
          creditor_id: Number(ep.creditor_id),
          value: Number(
            (ep.value as string).replace(/\./g, '').replace(',', '.')
          )
        };
      });

    const paid_status = (
      data.paid ? 'PAID' : 'PENDING'
    ) as InvoicePaymentStatus;

    const body = {
      ...data,
      creditor_id: Number(data.creditor_id),
      value: Number(data.value.replace(/\./g, '').replace(',', '.')),
      installments: data.installments ? Number(data.installments) : undefined,
      paid_status,
      external_payments
    };

    const response = defaultValues
      ? await update(body, defaultValues.id)
      : await create(body);

    feedback({
      ...response,
      type: response.type as 'success' | 'destructive',
      onSuccess: () => router.push('/hub/invoices')
    });
  };

  const { creditors, isLoading } = useCreditors();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="purchase_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data da compra</FormLabel>
              <FormControl>
                <DatePicker date={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Credor <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SelectSearch
                  selected={field.value}
                  onChange={field.onChange}
                  items={creditors}
                  loading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 max-md:flex-col">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Titulo <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o título da compra" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite o valor da compra"
                    onChange={(e) => field.onChange(maskCash(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="paid"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Marcar compra como paga
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tipo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SelectSearch
                  selected={field.value}
                  onChange={field.onChange}
                  items={paymentsType}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('payment_type') === 'INSTALLMENT' && (
          <FormField
            control={form.control}
            name="installments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Parcelas <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite a quantidade de parcelas"
                    onChange={(e) => field.onChange(maskNumber(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="space-y-2">
          {fields.length > 0 && (
            <>
              <h2 className="pb-2 uppercase text-primary text-sm">
                Pagamentos compartilhado
              </h2>
              {fields.map((field, id) => (
                <div key={field.id} className="border rounded-md p-4">
                  <div className="flex gap-2 max-md:flex-col">
                    <FormField
                      control={form.control}
                      name={`external_payments.${id}.creditor_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Devedor <span className="text-destructive">*</span>
                          </FormLabel>

                          <FormControl>
                            <SelectSearch
                              selected={field.value}
                              onChange={field.onChange}
                              items={creditors}
                              loading={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`external_payments.${id}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Valor <span className="text-destructive">*</span>
                          </FormLabel>

                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Digite o valor"
                              onChange={(e) =>
                                field.onChange(maskCash(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => remove(id)}
                      variant="link"
                      className="font-bold px-0 text-destructive pb-0 pt-2"
                    >
                      <Trash /> Remover
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}

          <p className="text-destructive text-sm py-2">
            {errors.external_payments
              ? errors.external_payments.root?.message
              : ''}
          </p>

          <div>
            <Button
              type="button"
              onClick={() => append({ creditor_id: '', value: '' })}
              variant="link"
              className="font-bold px-0"
            >
              <HandCoins /> Adicionar pagamento compartilhado
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button disabled={isSubmitting || !isDirty} className="items-center">
            {isSubmitting && <Loader2 className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
