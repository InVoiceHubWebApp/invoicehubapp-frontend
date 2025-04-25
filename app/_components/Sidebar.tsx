'use client';

import type { User as UserType } from '../_types/user';
import { Menu } from './Menu';

type SidebarProps = { user: UserType };

export function Sidebar({ user }: SidebarProps) {
  return (
    <div className="w-[250px] h-screen bg-card border-r max-md:hidden">
      <Menu user={user} />
    </div>
  );
}
