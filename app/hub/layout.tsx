import { cookies } from 'next/headers';
import { MenuMobile, Sidebar } from '../_components';
import { redirect } from 'next/navigation';
import type { User } from '../_types/user';
import { decrypt } from '@/lib/session';

export default async function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const cookieSession = (await cookies()).get('session')?.value;
  if (!cookieSession) {
    redirect('/');
  }

  const session = await decrypt(cookieSession);
  if (!session) {
    redirect('/');
  }

  const user = session.user as User;

  return (
    <main className="grid grid-cols-[250px_auto] h-screen max-md:flex">
      <Sidebar user={user} />
      <div className="p-6 overflow-auto w-full">
        <MenuMobile user={user} />
        <div>{children}</div>
      </div>
    </main>
  );
}
