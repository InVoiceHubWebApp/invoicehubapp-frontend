import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from '@/app/_types/auth';
import { cookies } from 'next/headers';
import { User } from '@/app/_types/user';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
  }
}

export async function createSession(user: User, access_token: string) {
  const session = await encrypt({ user });
  const cookieStore = await cookies();

  cookieStore.set('access_token', access_token, {
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
    maxAge: 29 * 60, // 29 minutos
    path: '/'
  });

  cookieStore.set('session', session, {
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
    maxAge: 29 * 60, // 29 minutos
    path: '/'
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete('access_token');
  cookieStore.delete('session');
}
