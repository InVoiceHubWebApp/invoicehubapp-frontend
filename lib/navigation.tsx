"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type options = {
  params?: Record<string, string>;
  removeParamsKeys?: string[];
};

export const useNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getParams = () => {
    return Object.fromEntries(searchParams)
  }

  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  const push = ({ params, removeParamsKeys }: options) => {
    if (removeParamsKeys) {
      const sp = new URLSearchParams(searchParams);
      removeParamsKeys.forEach((p) => sp.delete(p));
      return router.push(`${pathname}?${sp.toString()}`);
    }
    if (searchParams) {
      const sp = new URLSearchParams(params);
      return router.push(`${pathname}?${sp.toString()}`);
    }
    return router.push(`${pathname}`);
  };

  return { searchParams, pathname, router, getParam, push, getParams };
};
