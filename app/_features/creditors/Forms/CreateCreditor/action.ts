"use server";

import { createCreditor, updateCreditor } from "@/app/_service/creditors";
import type { CreditorBody } from "@/app/_types/creditors";

export async function create(data: CreditorBody) {
  const response = await createCreditor(data);

  if (response.ok) {
    return {
      type: "success",
      title: "Sucesso",
      description: "O credor foi criado com sucesso",
    };
  }

  return {
    type: "destructive",
    title: "Error",
    description:
      "Ocorreu um erro ao tentar realizar a operação. Por favor, tente de novo. Se o erro persistir, contate um administrador.",
  };
}

export async function update(data: CreditorBody, id: number) {
  const response = await updateCreditor(data, id);

  if (response.ok) {
    return {
      type: "success",
      title: "Sucesso",
      description: "O credor foi editado com sucesso",
    };
  }

  return {
    type: "destructive",
    title: "Error",
    description:
      "Ocorreu um erro ao tentar realizar a operação. Por favor, tente de novo. Se o erro persistir, contate um administrador.",
  };
}
