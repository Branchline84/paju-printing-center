import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const member = await prisma.member.create({
      data: {
        email: body.email,
        name: body.name,
        company: body.company,
        phone: body.phone,
        representative: body.representative,
        mainProducts: body.mainProducts,
        imageUrls: body.imageUrls,
        videoUrl: body.videoUrl,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to register member' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(members);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      error: 'Failed to fetch members',
      details: error.message || String(error)
    }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, approved } = await request.json();
    const member = await prisma.member.update({
      where: { id: Number(id) },
      data: { approved: Boolean(approved) },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}
