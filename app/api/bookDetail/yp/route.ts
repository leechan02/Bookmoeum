import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get('isbn');
  
  if (!isbn) {
    return NextResponse.json({ error: 'ISBN is required' }, { status: 400 });
  }

  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new" as any });
    const page = await browser.newPage();

    // 영풍문고 검색 페이지로 이동
    await page.goto(`https://www.ypbooks.co.kr/search/book?word=${encodeURIComponent(isbn)}`, {
      waitUntil: 'networkidle0',
    });

    // 검색 결과 대기
    await page.waitForSelector('.book.book--line.book--list', { timeout: 5000 }).catch(() => null);

    // 책 정보 추출
    const bookData = await page.evaluate(() => {
      const bookElement = document.querySelector('.book.book--line.book--list');
      if (!bookElement) return null;

      const title = bookElement.querySelector('.book__title')?.textContent?.trim();
      const link = bookElement.querySelector('.book__btn .btn[target="_blank"]')?.getAttribute('href');

      return { title, link};
    });

    if (bookData) {
      return NextResponse.json({
        exists: true,
        title: bookData.title,
        link: bookData.link ? `https://www.ypbooks.co.kr${bookData.link}` : undefined,
      });
    } else {
      return NextResponse.json({ exists: false });
    }

  } catch (error) {
    console.error('Error crawling YP Books:', error);
    return NextResponse.json({ error: 'Failed to crawl YP Books' }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}