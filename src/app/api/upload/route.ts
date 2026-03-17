import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
  // 🔍 환경 변수 확인 (Vercel 설정 누락 방지)
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[Upload API] Missing BLOB_READ_WRITE_TOKEN');
    return NextResponse.json({ 
      error: 'Vercel Blob 토큰이 설정되지 않았습니다.' 
    }, { status: 500 });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    
    // 🔐 '토큰 생성' 요청만 인증 체크를 수행합니다.
    if (body.type === 'blob.generate-client-token') {
      if (!(await isAuthenticated())) {
        console.error('[Upload API] Unauthorized attempt');
        return NextResponse.json({ error: '관리자 로그인이 필요합니다.' }, { status: 401 });
      }
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[Upload API] SUCCESS:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error('[Upload API] Error:', error.message);
    return NextResponse.json(
      { error: `업로드 서버 오류: ${error.message}` },
      { status: 400 },
    );
  }
}
