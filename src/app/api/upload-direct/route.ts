import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request): Promise<NextResponse> {
  // 1. 보안 체크
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '관리자 로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '업로드할 파일이 없습니다.' }, { status: 400 });
    }

    // 파일명 난수화 (UUID)
    const extension = file.name.split('.').pop();
    const safeFileName = `direct-${uuidv4()}.${extension}`;

    // Vercel Blob으로 직접 업로드
    // 스토리지 설정을 'Public'으로 변경하시기를 강력 권장합니다.
    const blob = await put(safeFileName, file, {
      access: 'public',
    });

    console.log('[Direct Upload] SUCCESS URL:', blob.url);
    return NextResponse.json({ ...blob, success: true });
  } catch (error: any) {
    console.error('[Direct Upload] Critical Error:', error.message);
    return NextResponse.json(
      { error: `서버 업로드 오류: ${error.message}` },
      { status: 500 }
    );
  }
}
