import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '업로드할 파일이 없습니다.' }, { status: 400 });
    }

    // 파일 형색 제한 (이미지 및 동영상만)
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime'
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: '허용되지 않는 파일 형식입니다. (이미지 및 MP4/WebM 동영상만 가능)' }, { status: 400 });
    }

    // 파일 크기 제한 (이미지는 5MB, 동영상은 20MB)
    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `파일 크기가 너무 큽니다. (${isVideo ? '동영상 20MB' : '이미지 5MB'} 이하)` }, { status: 400 });
    }

    // 파일명 난수화 (UUID)
    const extension = file.name.split('.').pop();
    const safeFileName = `signup-${uuidv4()}.${extension}`;

    // Vercel Blob으로 업로드 (Public access for signup)
    const blob = await put(safeFileName, file, {
      access: 'public',
    });

    return NextResponse.json({ ...blob, success: true });
  } catch (error: any) {
    console.error('[Signup Upload] Error:', error.message);
    return NextResponse.json(
      { error: `업로드 오류: ${error.message}` },
      { status: 500 }
    );
  }
}
