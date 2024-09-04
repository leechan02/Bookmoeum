import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "@/libs/firebase/admin";

export async function POST(request: NextRequest) {
  console.log("API Route hit: POST", request.url);
  
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }
    
    // Firebase에서 토큰 확인
    const decodedToken = await getFirebaseAdminAuth().verifyIdToken(token);
    
    // 응답 객체 생성
    const response = NextResponse.json(
      { message: "로그인 성공", user: decodedToken },
      { status: 200 }
    );
    
    // 쿠키 설정
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1시간
      path: "/",
    });
    
    return response;
  } catch (error: any) {
    console.error("토큰 검증 실패:", error);
    return NextResponse.json(
      { error: "인증 실패", details: error.message },
      { status: 401 }
    );
  }
}