import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const start = searchParams.get("start") || "1";

  if (!query) {
    return NextResponse.json(
      { message: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  const apiUrl = `https://openapi.naver.com/v1/search/book.json?query=${encodeURIComponent(
    query
  )}&display=100&start=${start}`;

  // 환경 변수에서 클라이언트 아이디와 시크릿을 가져옵니다.
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}