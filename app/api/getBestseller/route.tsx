import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.ALADDIN_API_KEY}&QueryType=Bestseller&SearchTarget=Book&MaxResults=20&Cover=Big&Version=20131101&output=js`
    );

    if (!response.ok) {
      throw new Error("Aladin API에서 데이터를 가져오지 못했습니다");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
