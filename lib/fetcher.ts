import type { NextResponse } from "next/server";
import { authFetch } from "./fetch";

type FetcherProps = {
  path: string;
  init?: RequestInit;
};

export type ResponseError = { message: string; status: number };

const getError = (data: Record<string, string>, reponse: NextResponse) => {
  return { message: data.detail as string, status: reponse.status };
};

export async function Fetcher<T>({ path, init }: FetcherProps) {
  const response = await authFetch(path, init);
  const json = await response.json();
  const data = response.ok
    ? (json as T)
    : (getError(json, response) as ResponseError);
  return { info: response, data };
}
