'use server';

import { createSession } from '@/lib/session';

type AuthForm = { username: string; password: string };

export async function login(data: AuthForm) {
  const response = await fetch(`${process.env.API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  });

  const json = await response.json();

  if (response.ok) {
    const { access_token, user } = json;

    await createSession(user, access_token);

    return {
      type: 'success',
      title: 'Acesso realizado com sucesso',
      description: 'Seja bem-vindo à plataforma Invoice Hub'
    };
  }

  const { detail } = json;
  return { type: 'destructive', title: 'Erro', description: detail };
}
