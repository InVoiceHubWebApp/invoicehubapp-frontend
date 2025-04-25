"use server";
import { authFetch } from "@/lib/fetch";
import type { CreditorBody, CreditorUpdateBody } from "../_types/creditors";

const resource = "/creditors";

export const createCreditor = async (data: CreditorBody) => {
  return await authFetch(`${resource}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCreditor = async (data: CreditorUpdateBody, id: number) => {
  return await authFetch(`${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCreditor = async (id: number) => {
  const response = await authFetch(`${resource}/${id}`, {
    method: "DELETE",
    noContent: true,
  });

  if (response.ok) {
    return {
      type: "success",
      title: "Sucesso",
      description: "O credor foi excluído permanentemente.",
    };
  }

  return {
    type: "destructive",
    title: "Error",
    description:
      "Ocorreu um erro ao tentar realizar a operação. Por favor, tente de novo. Se o erro persistir, contate um administrador.",
  };
};
