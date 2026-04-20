import { NextResponse } from 'next/server';
import { loginAdmin, logoutAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const success = await loginAdmin(password);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류';
    console.error('[Login API] Server Error:', message);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE() {
  await logoutAdmin();
  return NextResponse.json({ success: true });
}
