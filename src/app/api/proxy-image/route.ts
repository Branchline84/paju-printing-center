import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new Response('이미지 주소가 없습니다.', { status: 400 });
  }

  // Vercel Blob 주소인지 확인 (보완책)
  if (!imageUrl.includes('public.blob.vercel-storage.com') && !imageUrl.includes('vercel-storage.com')) {
    return new Response('허용되지 않은 호스트입니다.', { status: 403 });
  }

  try {
    // 서버측 토큰을 사용하여 비공개 이미지에 접근
    const response = await fetch(imageUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
      // 이미지 데이터이므로 캐싱 설정
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      console.error(`[Image Proxy] Fetch failed: ${response.status}`);
      return new Response('이미지를 불러오지 못했습니다.', { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('[Image Proxy] Error:', error.message);
    return new Response('서버 오류로 이미지를 가져오지 못했습니다.', { status: 500 });
  }
}
