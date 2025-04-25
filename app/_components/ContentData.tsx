import type { NextResponse } from "next/server";
import type { ReactNode } from "react";

type ContentDataProps = {
  children: ReactNode;
  info: NextResponse;
};

export function ContentData({ children, info }: ContentDataProps) {
  if (!info.ok) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-secondary-foreground italic">
          Ocorreu um erro ao carregar as informações. Por favor, atualize a
          página. Se o erro persistir, contate um administrador.
        </p>
      </div>
    );
  }
  return children;
}
