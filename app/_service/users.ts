'use server';

import { authFetch } from '@/lib/fetch';
import { UserBase } from '../_types/user';

const resource = '/users';

export const getUserBySearch = async (seacrh: string) => {
  const response = await authFetch(`${resource}/search?search=${seacrh}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    return { data };
  }

  return { data: [] };
};

export const createUser = async (user: UserBase) => {
  const response = await fetch(`${process.env.API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (response.ok) {
    return {
      type: 'success',
      title: 'Cadastro realizado com sucesso',
      description:
        'Seu cadastro foi concluído com sucesso. Efetue o login para acessar a plataforma.'
    };
  }

  return {
    type: 'destructive',
    title: 'Erro Interno no Servidor',
    description: 'Um erro ocorreu no cadastro.'
  };
};
