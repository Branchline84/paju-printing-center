import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET 환경변수가 설정되지 않았습니다.');
  }
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin UI Routes
  if (pathname.startsWith('/admin')) {
    // Skip login page itself (normalized check)
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Protect Admin API Routes (Sensitive operations)
  // We allow public GET for posts, but protect POST/PATCH/DELETE
  const adminApiPaths = [
    '/api/members',
    '/api/inquiries',
    '/api/posts',
  ];

  const isSensitiveApi = adminApiPaths.some(path => pathname.startsWith(path));
  const isWriteOp = ['POST', 'PATCH', 'DELETE'].includes(request.method);
  
  // Members and Inquiries are sensitive even for GET (except for member registration which is POST)
  const isMemberOrInquiryAccess = (pathname.startsWith('/api/members') || pathname.startsWith('/api/inquiries')) && request.method === 'GET';

  if ((isSensitiveApi && isWriteOp && pathname !== '/api/members' && pathname !== '/api/inquiries') || 
      (isMemberOrInquiryAccess) ||
      (pathname.startsWith('/api/posts') && isWriteOp)) {
    
    // Note: /api/members POST (registration) and /api/inquiries POST (submission) are PUBLIC.
    // However, /api/members GET/PATCH (admin view/approve) is PROTECTED.
    
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
