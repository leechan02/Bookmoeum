import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.LIBRARY_API_KEY;
const BASE_URL = "http://data4library.kr/api/bookExist";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get('isbn');
  const libCode = searchParams.get('libCode');

  if (!isbn || !libCode) {
    return NextResponse.json({ message: "ISBN and libCode are required" }, { status: 400 });
  }

  const url = `${BASE_URL}?authKey=${API_KEY}&isbn13=${isbn}&libCode=${libCode}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("도서관 API에서 데이터를 가져오지 못했습니다");
    }

    const data = await response.json();
    console.log("도서관 API 응답:", data);

    if (data.response && data.response.result) {
      const { hasBook, loanAvailable } = data.response.result;
      
      return NextResponse.json({
        exists: hasBook === "Y",
        loanAvailable: loanAvailable === "Y",
      });
    } else {
      return NextResponse.json({ 
        exists: false, 
        loanAvailable: false,
      });
    }
  } catch (error) {
    console.error("도서관 API 에러:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}