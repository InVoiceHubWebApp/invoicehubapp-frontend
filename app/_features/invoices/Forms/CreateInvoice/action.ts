"use server";
import { createInvoice, updateInvoice } from "@/app/_service/invoices";
import type { InvoiceBody, InvoiceUpdateBody } from "@/app/_types/invoices";

export async function create(data: InvoiceBody) {
  const response = await createInvoice(data);

  if (response.ok) {
    return {
      type: "success",
      title: "Sucesso",
      description: "A compra foi registrada com sucesso",
    };
  }

  return {
    type: "destructive",
    title: "Error",
    description:
      "Ocorreu um erro ao tentar realizar a operação. Por favor, tente de novo. Se o erro persistir, contate um administrador.",
  };
}

export async function update(data: InvoiceUpdateBody, id: number) {
  const response = await updateInvoice(data, id);

  if (response.ok) {
    return {
      type: "success",
      title: "Sucesso",
      description: "A compra foi editada com sucesso",
    };
  }

  return {
    type: "destructive",
    title: "Error",
    description:
      "Ocorreu um erro ao tentar realizar a operação. Por favor, tente de novo. Se o erro persistir, contate um administrador.",
  };
}
