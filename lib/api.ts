export function getApi(baseUrl?: string) {
  return (input: string, init?: RequestInit) => {
    return fetch(`${baseUrl}${input}`, init);
  };
}

export const api = getApi(process.env.API_URL);
export const bearer = (token: string) => `Bearer ${token}`;
