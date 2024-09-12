// app/api/bookDtail/kyobo/route.ts

import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get('isbn');

  if (!isbn) {
    return NextResponse.json({ error: 'ISBN is required' }, { status: 400 });
  }

  const searchUrl = `https://search.kyobobook.co.kr/search?keyword=${encodeURIComponent(isbn)}&gbCode=TOT&target=total`;

  try {
    const response = await fetch(searchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const bookItem = $('#shopData_list .prod_item').first();

    if (bookItem.length === 0) {
      return NextResponse.json({ exists: false });
    }

    const title = bookItem.find('.prod_info').text().trim();
    const link = bookItem.find('.prod_info').attr('href');

    // ISBN이 정확히 일치하는지 확인
    // const detailResponse = await fetch(link as string);
    // const detailHtml = await detailResponse.text();
    // const $detail = cheerio.load(detailHtml);
    // const bookIsbn = $detail('.tbl_row .isbn').text().trim();

    // if (bookIsbn !== isbn) {
    //   return NextResponse.json({ exists: false });
    // }

    console.log("kyobo API 응답:", link);

    return NextResponse.json({
      exists: true,
      title: title,
      link: link
    });

  } catch (error) {
    console.error('Error checking Kyobobook:', error);
    return NextResponse.json({ error: 'Failed to check Kyobobook' }, { status: 500 });
  }
}