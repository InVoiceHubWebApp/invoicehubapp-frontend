'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { creditorSchema, type CreditorSchemaType } from './schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { SearchByUser, SelectSearch } from '@/app/_components';
import { Input } from '@/components/ui/input';
import { maskCash, maskDate } from '@/lib/formatter';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { create, update } from './action';
import { useNavigation } from '@/lib/navigation';
import { useToast } from '@/lib/toast';
import type { Creditor, CreditorTypeEnum } from '@/app/_types/creditors';
import { useMemo } from 'react';

const creditorTypes = [
  { label: 'Pessoa', value: 'PUBLIC_PERSON' },
  { label: 'Banco', value: 'BANK' },
  { label: 'Boleto', value: 'PAYMENT_SLIP' },
  { label: 'Usuário', value: 'USER' }
];

type FormProps = {
  defaultValues?: Creditor;
};

const DEFAULTVALUES = {
  due_date: '',
  name: '',
  limit_value: ''
};

export function Form({ defaultValues }: FormProps) {
  const values = useMemo(() => {
    if (defaultValues) {
      const { due_date, limit_value, creditor_type } =
        defaultValues as Creditor;
      const date = new Date(due_date);
      return {
        ...defaultValues,
        due_date: maskDate(`${date.getDate()}`),
        limit_value: limit_value ? maskCash(limit_value.toFixed(2)) : undefined,
        creditor_type: creditor_type as CreditorTypeEnum,
        user_as_creditor_id: defaultValues.user_as_creditor
          ? `${defaultValues.user_as_creditor.username}_${defaultValues.user_as_creditor.id}`
          : undefined
      };
    }
  }, [defaultValues]);

  const form = useForm<CreditorSchemaType>({
    resolver: zodResolver(creditorSchema),
    defaultValues: defaultValues ? values : DEFAULTVALUES
  });

  const {
    formState: { isSubmitting, isDirty }
  } = form;

  const { router } = useNavigation();
  const { feedback } = useToast();

  async function onSubmit(data: CreditorSchemaType) {
    const { limit_value, due_date, user_as_creditor_id } = data;
    const value = limit_value
      ? Number(limit_value.replace(/\./g, '').replace(',', '.'))
      : undefined;
    const date = new Date();
    const user = user_as_creditor_id
      ? user_as_creditor_id.split('_')
      : undefined;
    const body = {
      ...data,
      limit_value: value,
      due_date: new Date(date.getFullYear(), date.getMonth(), Number(due_date)),
      user_as_creditor_id: user ? Number(user[1]) : undefined
    };
    const response = defaultValues
      ? await update(body, defaultValues.id)
      : await create(body);

    feedback({
      ...response,
      type: response.type as 'success' | 'destructive',
      onSuccess: () => router.push('/hub/management')
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Data de Vencimento (dia){' '}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o dia de vencimento"
                  {...field}
                  onChange={(e) => field.onChange(maskDate(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 max-md:flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Título <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título do credor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limite</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o limite de gasto"
                    {...field}
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
          name="creditor_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tipo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SelectSearch
                  selected={field.value}
                  onChange={field.onChange}
                  items={creditorTypes}
                  disabled={!!defaultValues}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('creditor_type') === 'USER' && (
          <FormField
            control={form.control}
            name="user_as_creditor_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Usuário <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SearchByUser
                    disabled={!!defaultValues}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
