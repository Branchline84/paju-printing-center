import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    let fixCount = 0;
    const fixedTitles: string[] = [];

    for (const post of posts) {
      if (!post.imageUrls) continue;
      
      try {
        const firstParse = JSON.parse(post.imageUrls);
        if (typeof firstParse === 'string') {
          const secondParse = JSON.parse(firstParse);
          await prisma.post.update({
            where: { id: post.id },
            data: {
              imageUrls: JSON.stringify(secondParse)
            }
          });
          fixCount++;
          fixedTitles.push(post.title);
        }
      } catch (e) {
        // Skip non-problematic data
      }
    }

    return NextResponse.json({ 
      success: true, 
      fixCount, 
      fixedTitles,
      message: `${fixCount} posts recovered.` 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
