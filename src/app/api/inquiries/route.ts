import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      },
    });
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const inquiry = await prisma.inquiry.update({
      where: { id: Number(id) },
      data: { status: String(status) },
    });
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
