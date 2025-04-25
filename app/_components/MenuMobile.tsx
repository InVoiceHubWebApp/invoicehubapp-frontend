'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';
import { User } from '@/app/_types/user';
import { Menu } from './Menu';

type MenuMobileProps = { user: User };

export function MenuMobile({ user }: MenuMobileProps) {
  return (
    <Sheet>
      <SheetTrigger className="hidden max-md:block mb-4">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle></SheetTitle>
        <Menu user={user} />
      </SheetContent>
    </Sheet>
  );
}
