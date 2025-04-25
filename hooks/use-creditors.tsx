'use client';

import { Creditor } from '@/app/_types/creditors';
import { useMemo } from 'react';
import useSWRImmutable from 'swr';

export function useCreditors() {
  const { data, error, isLoading } =
    useSWRImmutable<Creditor[]>('/creditors/list');

  const items: { label: string; value: string }[] = useMemo(() => {
    return data
      ? data.map((item) => {
          return { label: item.name, value: `${item.id}` };
        })
      : [];
  }, [data]);

  return { creditors: items, isLoading, isError: error };
}
