import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    await prisma.member.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    // We can handle approval or full update here
    const member = await prisma.member.update({
      where: { id },
      data: {
        ...body,
        approved: body.approved !== undefined ? Boolean(body.approved) : undefined,
      },
    });
    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}
