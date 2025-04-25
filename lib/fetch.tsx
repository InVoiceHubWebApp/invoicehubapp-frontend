'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { api, bearer } from './api';

export async function authFetch(
  path: string,
  init?: RequestInit & { noContent?: boolean }
): Promise<NextResponse> {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.get('access_token')?.value;

  if (accessToken) {
    const headers = new Headers({
      ...init?.headers,
      Authorization: bearer(accessToken as string)
    });

    const res = await api(path, {
      ...init,
      headers
    });

    if (init && !!init.noContent) {
      return NextResponse.json({});
    }

    const data = await res.json();

    if (!res.ok) {
      const { detail } = data;
      return NextResponse.json(
        { message: detail, data: [] },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  }

  return redirect('/');
}

export const fetcher = async (
  path: string,
  init?: RequestInit & { noContent?: boolean }
) => authFetch(path, init).then((r) => r.json());
