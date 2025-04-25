'use client';

import Link from 'next/link';
import { menuItems } from '../menu';
import { useNavigation } from '@/lib/navigation';
import type { User as UserType } from '../_types/user';
import { User } from './User';

type MenuProps = { user: UserType };

export function Menu({ user }: MenuProps) {
  const pages = Object.keys(menuItems);
  const { pathname } = useNavigation();
  const paths = pathname.split('/');

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl p-6 text-secondary">Invoice Hub</h2>
        <div className="space-y-4">
          {pages.map((item) => {
            const { path, title, icon: Icon } = menuItems[item];
            const itemPaths = path.split('/');
            const isCurrent =
              path.endsWith(paths[paths.length - 1]) ||
              paths.some((path) => itemPaths.slice(2).includes(path));
            return (
              <Link
                href={path}
                key={path}
                data-iscurrent={isCurrent}
                className="text-muted-foreground px-4 flex items-center gap-2 border-l-8 border-l-transparent hover:font-semibold hover:border-l-primary hover:text-primary data-[iscurrent=true]:font-semibold data-[iscurrent=true]:border-l-primary data-[iscurrent=true]:text-primary"
              >
                <Icon size={18} />
                {title}
              </Link>
            );
          })}
        </div>
      </div>
      <User user={user} />
    </div>
  );
}
