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

    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip', 'application/x-zip-compressed',
      'application/haansofthwp', 'application/x-hwp',
    ];

    // MIME type이 빈 문자열로 오는 경우 확장자로 보완 검사
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mov', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'hwp'];
    const typeOk = allowedTypes.includes(file.type) || allowedExtensions.includes(ext);

    if (!typeOk) {
      return NextResponse.json({ error: '허용되지 않는 파일 형식입니다.' }, { status: 400 });
    }

    // 파일명 난수화 (UUID)
    const extension = file.name.split('.').pop();
    const safeFileName = `upload-${uuidv4()}.${extension}`;

    // Vercel Blob으로 업로드 (Server-side put)
    // Client-side resizing will ensure file size is < 4.5MB limit
    const blob = await put(safeFileName, file, {
      access: 'private',
    });

    return NextResponse.json({ ...blob, success: true });
  } catch (error: any) {
    console.error('[Upload API] Error:', error.message);
    return NextResponse.json(
      { error: `업로드 오류: ${error.message}` },
      { status: 500 }
    );
  }
}
