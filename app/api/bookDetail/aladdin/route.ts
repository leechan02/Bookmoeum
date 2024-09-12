import { NextRequest, NextResponse } from "next/server";
import { useLayoutEffect } from "react";

const API_KEY = process.env.ALADDIN_API_KEY;
const BASE_URL = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get('isbn');

  if (!isbn) {
    return NextResponse.json({ message: "ISBN is required" }, { status: 400 });
  }

  const url = `${BASE_URL}?ttbkey=${API_KEY}&itemIdType=ISBN13&ItemId=${isbn}&output=js&Version=20131101&OptResult=ebookList,usedList&Cover=Big`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Aladin API에서 데이터를 가져오지 못했습니다");
    }
    const data = await response.json();
    console.log("알라딘 API 응답:", data.item[0].title);

    // 알라딘 데이터를 일관된 형식으로 변환
    if (data.item && data.item.length > 0) {
      const book = data.item[0];

      let usedBookInfo = {available: false, link: null};
      const usedList = book.subInfo?.usedList;

      if (usedList) {
        const usedSources = ['aladinUsed', 'userUsed', 'spaceUsed'];
        for (const source of usedSources) {
          if (usedList[source] && usedList[source].itemCount > 0) {
            usedBookInfo = {
              available: true,
              link: usedList[source].link,
            };
            break;
          }
        }
      }

      return NextResponse.json({
        exists: true,
        title: book.title,
        link: book.link,
        category: book.categoryName,
        page: book.subInfo?.itemPage,
        author: book.author,
        usedBook: usedBookInfo,
      });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error("Aladin API 에러:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}