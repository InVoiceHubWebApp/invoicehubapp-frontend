import {
  TooltipProvider,
  Tooltip as TooltipLayout,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

type TooltipProps = {
  text: string;
  children: ReactNode;
};
export function Tooltip({ text, children }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <TooltipLayout>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{text}</p>
        </TooltipContent>
      </TooltipLayout>
    </TooltipProvider>
  );
}
