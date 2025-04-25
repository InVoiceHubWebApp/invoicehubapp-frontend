import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { origin, pathname } = request.nextUrl;

  if (pathname == '/') {
    const accessToken = request.cookies.get('access_token')?.value;
    const session = request.cookies.get('session')?.value;

    if (accessToken && session) {
      return NextResponse.redirect(new URL('/hub', origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/hub/:path*']
};
