import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;

  // '/mylibrary' 경로 체크
  if (request.nextUrl.pathname.startsWith('/mylibrary')) {
    if (!authToken) {
      // 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (request.nextUrl.pathname === '/login' && authToken) {
    // 이미 로그인한 사용자를 홈페이지로 리다이렉트
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mylibrary/:path*', '/login'],
};