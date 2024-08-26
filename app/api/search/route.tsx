import { NextResponse } from "next/server";

const API_Key = process.env.ALADDIN_API_KEY;

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

  const apiUrl = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${API_Key}&Query=${encodeURIComponent(
    query
  )}&QueryType=Keyword&SearchTarget=Book&output=js&Version=20131101&Start=${start}&MaxResults=100&Cover=Big
`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Aladin API에서 데이터를 가져오지 못했습니다");
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
