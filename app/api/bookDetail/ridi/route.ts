import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const searchUrl = `https://ridibooks.com/search?q=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(searchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const bookItem = $('.rigrid-1it00d li').first();

    if (bookItem.length === 0) {
      return NextResponse.json({ exists: false });
    }

    const foundTitle = bookItem.find('.b-1lo6n4q span').text().trim();
    const link = `https://ridibooks.com${bookItem.find('.b-1lo6n4q').attr('href')}`;

    // 검색된 제목이 원래 제목과 유사한지 확인
    if (!isSimilarTitle(title, foundTitle)) {
      console.log('Found title is not similar:', foundTitle);
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({
      exists: true,
      title: foundTitle,
      link,
    });

  } catch (error) {
    console.error('Error checking Ridibooks:', error);
    return NextResponse.json({ error: 'Failed to check Ridibooks' }, { status: 500 });
  }
}

function isSimilarTitle(originalTitle: string, foundTitle: string): boolean {
  // 간단한 유사도 검사: 원본 제목의 단어들이 검색된 제목에 포함되어 있는지 확인
  const originalWords = originalTitle.toLowerCase().split(/\s+/);
  const foundTitleLower = foundTitle.toLowerCase();
  return originalWords.every(word => foundTitleLower.includes(word));
}