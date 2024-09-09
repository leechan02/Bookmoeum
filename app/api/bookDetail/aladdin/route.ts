import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Aladin API 에러:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
