import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const banner = await prisma.banner.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title?.trim(),
        subtitle: body.subtitle?.trim() || null,
        imageUrl: body.imageUrl || '',
        order: Number(body.order) || 0,
        isActive: body.isActive ?? true,
      }
    });
    return NextResponse.json(banner);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Banner PATCH] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.banner.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
