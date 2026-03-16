import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent('소상공인')}&hl=ko&gl=KR&ceid=KR:ko`;
    const res = await fetch(rssUrl);
    const xmlText = await res.text();

    const itemMatches = xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g);
    const news = [];

    for (const match of itemMatches) {
      const content = match[1];
      const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = content.match(/<link>([\s\S]*?)<\/link>/);
      
      if (titleMatch && linkMatch) {
        let title = titleMatch[1].replace('<![CDATA[', '').replace(']]>', '');
        const sourceIndex = title.lastIndexOf(' - ');
        if (sourceIndex > -1) {
          title = title.substring(0, sourceIndex);
        }

        news.push({
          title: title.trim(),
          link: linkMatch[1].replace('<![CDATA[', '').replace(']]>', '').trim()
        });
      }
      
      if (news.length >= 8) break;
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('External news fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch external news' }, { status: 500 });
  }
}
