import type { User } from "./user";

export type CreditorType = "USER" | "BANK" | "PAYMENT_SLIP" | "PUBLIC_PERSON";

export type Creditor = {
  id: number;
  creditor_type: CreditorType;
  name: string;
  due_date: Date;
  limit_value?: number;
  enabled: boolean;
  user_as_creditor_id?: number;
  user_as_creditor?: User;
};

export type CreditorBasic = {
  id: number;
  creditor_type: CreditorType;
  name: string;
  user_as_creditor: User;
};

export type CreditorBody = {
  creditor_type: CreditorType;
  name: string;
  due_date: Date;
  limit_value?: number;
  user_as_creditor_id?: number;
};

export type CreditorUpdateBody = {
  creditor_type?: CreditorType;
  name?: string;
  due_date?: Date;
  limit_value?: number;
};

export type ExternalPaymentCreditor = {
  creditor_id: number;
  value: number;
};

export type CreditorList = {
  id: number;
  creditor_type: CreditorType;
  name: string;
};

export const CreditorType: Record<CreditorType, string> = {
  USER: "Usuário",
  BANK: "Banco",
  PAYMENT_SLIP: "Boleto",
  PUBLIC_PERSON: "Pessoa",
};

export enum CreditorTypeEnum {
  USER = "USER",
  BANK = "BANK",
  PAYMENT_SLIP = "PAYMENT_SLIP",
  PUBLIC_PERSON = "PUBLIC_PERSON",
}
