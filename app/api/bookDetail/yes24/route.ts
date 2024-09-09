// app/api/bookDetail/yes24/route.ts

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return NextResponse.json({ error: "ISBN is required" }, { status: 400 });
  }

  const searchUrl = `https://www.yes24.com/Product/Search?domain=BOOK&query=${encodeURIComponent(
    isbn
  )}`;

  try {
    const response = await fetch(searchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    const bookItem = $("#yesSchList").first();

    if (bookItem.length === 0) {
      return NextResponse.json({ exists: false });
    }

    const title = bookItem.find(".gd_name").text().trim();
    let link = bookItem.find(".gd_name").attr("href");

    // 링크가 상대 경로인 경우 절대 경로로 변환
    if (link && !link.startsWith("http")) {
      link = `https://www.yes24.com${link}`;
    }

    console.log("title:", title);
    console.log("link:", link);

    // ISBN이 정확히 일치하는지 확인
    // const detailResponse = await fetch(link as string);
    // const detailHtml = await detailResponse.text();
    // const $detail = cheerio.load(detailHtml);
    // const bookIsbn = $detail('.tbl_row .isbn').text().trim();

    // if (bookIsbn !== isbn) {
    //   return NextResponse.json({ exists: false });
    // }

    return NextResponse.json({
      exists: true,
      title: title,
      link: link,
    });
  } catch (error) {
    console.error("Error checking yes24:", error);
    return NextResponse.json(
      { error: "Failed to check yes24" },
      { status: 500 }
    );
  }
}
