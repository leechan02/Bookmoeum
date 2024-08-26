import { NextResponse } from "next/server";

const TTBKey = process.env.ALADDIN_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const start = searchParams.get("start") || "1";

  if (!query) {
    return new Response("검색어를 입력해주세요", { status: 400 });
  }

  const apiUrl = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${TTBKey}&Query=${encodeURIComponent(
    query
  )}&QueryType=Keyword&SearchTarget=Book&output=js&Version=20131101&Start=${start}&MaxResults=100&Cover=Big
`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return new Response("API 호출 중 오류가 발생했습니다", { status: 500 });
  }
}
