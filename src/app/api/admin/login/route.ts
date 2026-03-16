import { NextResponse } from 'next/server';
import { loginAdmin, logoutAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const success = await loginAdmin(password);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  await logoutAdmin();
  return NextResponse.json({ success: true });
}
