import { get } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const filename = (await params).filename;
    
    // We need the full URL to fetch the blob. 
    // Since we only saved the URL in the DB, we can just use that.
    // However, for security and cleaner URLs, we might want to pass the whole URL or a specific identifier.
    // In our case, the DB stores the full URL: https://.../upload-uuid.jpg
    
    // Wait, the client is calling /api/images/[filename].
    // Let's assume they pass the actual blob URL as a query param or we reconstruct it.
    const { searchParams } = new URL(request.url);
    const blobUrl = searchParams.get('url');

    if (!blobUrl) {
      return NextResponse.json({ error: 'url is required' }, { status: 400 });
    }

    const result = await get(blobUrl, {
        access: 'private',
    });

    if (!result || !result.stream) {
      return NextResponse.json({ error: '이미지를 찾을 수 없습니다.' }, { status: 404 });
    }

    return new NextResponse(result.stream as any, {
      headers: {
        'Content-Type': result.blob.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('[Image Proxy] Error:', error.message);
    return NextResponse.json({ error: '이미지를 불러올 수 없습니다.' }, { status: 404 });
  }
}
