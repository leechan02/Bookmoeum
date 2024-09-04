import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 새로운 응답 객체 생성
    const response = NextResponse.json(
      { message: "로그아웃 성공" },
      { status: 200 }
    );

    // authToken 쿠키 제거
    response.cookies.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // 쿠키를 즉시 만료시킴
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("로그아웃 처리 중 오류:", error);
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류 발생" },
      { status: 500 }
    );
  }
}
