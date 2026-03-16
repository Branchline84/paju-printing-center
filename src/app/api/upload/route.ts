import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Use Edge Runtime for faster uploads

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'default.png';

    if (!request.body) {
      return NextResponse.json({ error: 'No body provided' }, { status: 400 });
    }

    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
