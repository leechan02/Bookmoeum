import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("API 호출:", request.url);

  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return NextResponse.json(
      { message: "ISBN is required" },
      { status: 400 }
    );
  }

  const apiUrl = `https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${isbn}`;
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Naver API 인증 정보가 없습니다.");
    return NextResponse.json(
      { message: "서버 설정 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
    });

    if (!response.ok) {
      throw new Error("Naver API에서 데이터를 가져오지 못했습니다");
    }

    const data = await response.json();
    return NextResponse.json(data.items[0]);
  } catch (error) {
    console.error("Naver API 에러:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}