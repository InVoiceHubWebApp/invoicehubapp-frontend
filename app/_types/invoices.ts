import type { CreditorBasic, ExternalPaymentCreditor } from './creditors';

export type InvoicePaymentStatus = 'PAID' | 'OVERDUE' | 'PENDING';
type InvoiceType = 'INSTALLMENT' | 'CASH' | 'FIXED';

export type InvoiceBody = {
  creditor_id: number;
  purchase_date: Date;
  title: string;
  value: number;
  installments?: number;
  payment_type: InvoiceType;
  paid_status: InvoicePaymentStatus;
  external_payments: ExternalPaymentCreditor[];
};

export type InvoiceUpdateBody = {
  creditor_id?: number;
  purchase_date?: Date;
  title?: string;
  value?: number;
  installments?: number;
  payment_type?: InvoiceType;
  paid_status?: InvoicePaymentStatus;
  external_payments?: ExternalPaymentCreditor[];
};

type ExternalPayment = {
  responsible_creditor: CreditorBasic;
  value: number;
  id: number;
};

export type Invoice = {
  id: number;
  creditor_id: number;
  purchase_date: Date;
  title: string;
  value: number;
  installments?: number;
  installment_value: number;
  installment_paid: number;
  last_payment_date: Date;
  payment_type: InvoiceType;
  paid_status: InvoicePaymentStatus;
  external_payments?: ExternalPayment[];
  responsible_creditor: CreditorBasic;
};

export type InvoiceStats = {
  payment: number;
  other_payments: number;
  total: number;
};

export type PaymentByCreditorType = {
  id: number;
  name: string;
  amount_receivable: number;
  amount_payable: number;
  total_value: number;
};

export type PaymentByMonthType = {
  date: string;
  amount: number;
};

export type PaymentByWeekType = {
  day_of_week: string;
  amount: number;
};

export type PaymentByType = {
  payment_type: InvoiceType;
  amount: number;
};

export const InvoiceType: Record<InvoiceType, string> = {
  INSTALLMENT: 'Parcelado',
  CASH: 'À vista',
  FIXED: 'Fixo'
};

export const InvoicePaymentStatus: Record<InvoicePaymentStatus, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  OVERDUE: 'Em atraso'
};

export enum InvoiceTypeEnum {
  INSTALLMENT = 'INSTALLMENT',
  CASH = 'CASH',
  FIXED = 'FIXED'
}

export enum InvoicePaymentStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}
