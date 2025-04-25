"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useNavigation } from "@/lib/navigation";
import type { ReactNode } from "react";

type DialogTriggerProps = {
  props: ButtonProps;
  children: ReactNode;
  searchParamValue: string;
};
export function DialogTrigger({
  props,
  children,
  searchParamValue,
}: DialogTriggerProps) {
  const { getParam, push, getParams } = useNavigation();

  const onOpen = () => {
    const open = getParam(searchParamValue);
    const params = getParams()
    if (!!!open) {
      return push({ params: { ...params, open: searchParamValue } });
    }
    push({ removeParamsKeys: ["open"] });
  };

  return (
    <Button onClick={onOpen} {...props}>
      {children}
    </Button>
  );
}
