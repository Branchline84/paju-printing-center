import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    
    const banners = await prisma.banner.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        title: body.title.trim(),
        subtitle: body.subtitle?.trim() || null,
        imageUrl: body.imageUrl || '',
        order: Number(body.order) || 0,
        isActive: body.isActive ?? true,
      }
    });
    return NextResponse.json(banner);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Banner POST] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
