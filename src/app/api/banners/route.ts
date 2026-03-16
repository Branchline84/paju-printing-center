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
    const banner = await prisma.banner.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        imageUrl: body.imageUrl,
        order: body.order || 0,
        isActive: body.isActive ?? true
      }
    });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}
