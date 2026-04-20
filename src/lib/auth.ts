import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
  }
  return new TextEncoder().encode(secret);
}

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.');
  }

  if (password === adminPassword) {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(getJwtSecret());

    (await cookies()).set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    return true;
  }
  return false;
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_token');
}

export async function isAuthenticated() {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getJwtSecret());
    return true;
  } catch {
    return false;
  }
}
