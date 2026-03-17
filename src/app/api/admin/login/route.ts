import { NextResponse } from 'next/server';
import { loginAdmin, logoutAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    console.log('[Login API] Password attempt received');
    const success = await loginAdmin(password);
    
    if (success) {
      console.log('[Login API] Login SUCCESS');
      return NextResponse.json({ success: true });
    } else {
      console.log('[Login API] Login FAILED: Invalid password');
      return NextResponse.json({ error: '비밀번호가 틀렸습니다. (Invalid password)' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('[Login API] Server Error:', error.message);
    return NextResponse.json({ error: `서버 오류: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE() {
  await logoutAdmin();
  return NextResponse.json({ success: true });
}
