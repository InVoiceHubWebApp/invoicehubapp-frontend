"use client";
import * as React from "react";
import { type ThemeProviderProps } from "next-themes";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetch";

const ThemeProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  { ssr: false },
);

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 999999,
        fetcher,
      }}
    >
      <ThemeProvider {...props}>
        {children}
        <Toaster />
      </ThemeProvider>
    </SWRConfig>
  );
}
