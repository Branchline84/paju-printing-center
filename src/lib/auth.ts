import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'paju-printing-center-secret-key-2024'
);

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'sogongin3!@'; // Default for dev
  
  if (password === adminPassword) {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h') // Session expires in 2 hours
      .sign(JWT_SECRET);
    
    (await cookies()).set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
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
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}
