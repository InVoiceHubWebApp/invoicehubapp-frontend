'use client';

import { DialogTrigger, Table, Tooltip } from '@/app/_components';
import dayjs from 'dayjs';
import type { DataTableColumn } from '@/app/_components/Table';
import {
  InvoicePaymentStatus,
  InvoiceType,
  type Invoice
} from '@/app/_types/invoices';
import { Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InvoicesProps = { invoices: Invoice[] };

const formatted = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'BRL'
});

const paymentStatusStyle = {
  OVERDUE:
    'data-[paid=OVERDUE]:bg-red-100 data-[paid=OVERDUE]:text-red-700 dark:data-[paid=OVERDUE]:bg-red-900 dark:data-[paid=OVERDUE]:text-red-100',
  PENDING:
    'data-[paid=PENDING]:bg-yellow-100 data-[paid=PENDING]:text-yellow-700 dark:data-[paid=PENDING]:bg-yellow-900 dark:data-[paid=PENDING]:text-yellow-100',
  PAID: 'data-[paid=PAID]:bg-green-100 data-[paid=PAID]:text-green-700 dark:data-[paid=PAID]:bg-green-900 dark:data-[paid=PAID]:text-green-100'
};

export const columns: DataTableColumn<Invoice>[] = [
  {
    accessorKey: 'purchase_date',
    header: () => 'Data da compra',
    cell: ({ row }) => dayjs(row.purchase_date).format('DD/MM/YYYY')
  },
  {
    accessorKey: 'responsible_creditor.name',
    header: () => 'Credor',
    cell: ({ row }) => row.responsible_creditor.name
  },
  {
    accessorKey: 'title',
    header: () => 'Título',
    cell: ({ row }) => row.title
  },
  {
    accessorKey: 'payment_type',
    header: () => 'Tipo de pagamento',
    cell: ({ row }) => (
      <span
        data-type={row.payment_type}
        className="text-xs uppercase rounded-md py-[2px] px-[5px] bg-chart-2/30  data-[type=CASH]:bg-chart-4/30  data-[type=FIXED]:bg-chart-1/30"
      >
        {InvoiceType[row.payment_type]}
      </span>
    )
  },
  {
    accessorKey: 'value',
    header: () => 'Valor',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <p>{formatted.format(row.value)}</p>
          {row.external_payments &&
            row.external_payments.map((external) => (
              <Tooltip
                key={external.responsible_creditor.id}
                text={`${external.responsible_creditor.name} ${external.responsible_creditor.user_as_creditor ? `(${external.responsible_creditor.user_as_creditor.username})` : ''}`}
              >
                <span className="text-destructive text-sm w-fit">
                  -{formatted.format(external.value)}
                </span>
              </Tooltip>
            ))}
        </div>
      );
    }
  },
  {
    accessorKey: 'installments',
    header: () => 'Número de parcelas',
    cell: ({ row }) => row.installments ?? '-'
  },
  {
    accessorKey: 'installment_value',
    header: () => 'Valor da parcela',
    cell: ({ row }) => {
      const value = row.installment_value ?? row.value;

      return (
        <div className="flex flex-col">
          <p>{formatted.format(value)}</p>
          {row.external_payments &&
            row.external_payments.map((external) => {
              const externalValue = row.installments
                ? external.value / row.installments
                : external.value;
              return (
                <Tooltip
                  key={external.responsible_creditor.id}
                  text={`${external.responsible_creditor.name} ${external.responsible_creditor.user_as_creditor ? `(${external.responsible_creditor.user_as_creditor.username})` : ''}`}
                >
                  <span className="text-destructive text-sm w-fit">
                    -{formatted.format(externalValue)}
                  </span>
                </Tooltip>
              );
            })}
        </div>
      );
    }
  },
  {
    accessorKey: 'installment_paid',
    header: () => 'Parcelas pagas',
    cell: ({ row }) => row.installment_paid
  },
  {
    accessorKey: 'last_payment_date',
    header: () => 'Último pagamento',
    cell: ({ row }) => dayjs(row.last_payment_date).format('MM/YYYY')
  },

  {
    accessorKey: 'paid',
    header: () => 'Situação',
    cell: ({ row }) => (
      <div
        data-paid={row.paid_status}
        className={cn(
          'flex w-fit py-[2px] px-[5px] gap-2 items-center justify-center rounded-md',
          paymentStatusStyle[row.paid_status]
        )}
      >
        <span className="text-xs uppercase font-bold">
          {InvoicePaymentStatus[row.paid_status]}
        </span>
      </div>
    )
  }
];

export function Invoices({ invoices }: InvoicesProps) {
  return (
    <Table<Invoice>
      columns={columns}
      data={invoices}
      actions={(item: Invoice) => (
        <div className="gap-2 flex">
          <DialogTrigger
            searchParamValue={`invoice_edit_${item.id}`}
            props={{ variant: 'outline', size: 'icon' }}
          >
            <Pencil />
          </DialogTrigger>
          <DialogTrigger
            searchParamValue={`invoice_delete_${item.id}`}
            props={{ variant: 'outline', size: 'icon' }}
          >
            <Trash2 />
          </DialogTrigger>
        </div>
      )}
    />
  );
}
