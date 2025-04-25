"use server";
import { authFetch } from "@/lib/fetch";
import type { InvoiceBody, InvoiceUpdateBody } from "../_types/invoices";

const resource = "/invoices";

export const createInvoice = async (data: InvoiceBody) => {
  return await authFetch(`${resource}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateInvoice = async (data: InvoiceUpdateBody, id: number) => {
  return await authFetch(`${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteInvoice = async (id: number) => {
  const response = await authFetch(`${resource}/${id}`, {
    method: "DELETE",
    noContent: true,
  });

  if (response.ok) {
    return {
      type: "success",
      title: "Sucesso",
      description: "A compra foi excluída permanentemente.",
    };
  }

  return {
    type: "destructive",
    title: "Error",
    description:
      "Ocorreu um erro ao tentar realizar a operação. Por favor, tente de novo. Se o erro persistir, contate um administrador.",
  };
};
