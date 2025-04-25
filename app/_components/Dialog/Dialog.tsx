'use client';

import {
  Dialog as DialogLayout,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigation } from '@/lib/navigation';
import type { ReactNode } from 'react';

type DialogProps = {
  trigger?: ReactNode;
  children: ReactNode;
  title: string;
  description?: string;
  searchParamValue?: string;
};

export function Dialog({
  trigger = null,
  children,
  title,
  description,
  searchParamValue = 'true'
}: DialogProps) {
  const { getParam, push } = useNavigation();
  const open = getParam('open');

  const onOpen = (open: boolean) => {
    if (open) {
      return push({ params: { open: searchParamValue } });
    }
    push({ removeParamsKeys: ['open'] });
  };

  return (
    <DialogLayout
      open={!!open && open == searchParamValue}
      onOpenChange={onOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="px-0 py-8 pl-8 max-md:h-screen max-md:pl-6">
        <ScrollArea className="max-h-[calc(100vh-10rem)] pr-6 mr-2 max-md:max-h-screen max-md:mr-0">
          <div className="p-1 space-y-4">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </DialogLayout>
  );
}
