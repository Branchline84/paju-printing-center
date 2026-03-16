import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  try {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          type ? { type } : {},
          q ? { title: { contains: q } } : {},
        ]
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: {
        type: body.type,
        title: body.title,
        content: body.content,
        author: body.author,
        imageUrls: body.imageUrls ? JSON.stringify(body.imageUrls) : null,
        videoUrl: body.videoUrl,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
