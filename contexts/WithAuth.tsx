"use client";
import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading) {
        if (!user && pathname !== "/login") {
          // 로그인하지 않은 사용자가 /login 이외의 페이지에 접근하려고 할 때
          router.push("/login");
        } else if (user && pathname === "/login") {
          // 로그인한 사용자가 /login 페이지에 접근하려고 할 때
          router.push("/");
        }
      }
    }, [user, loading, router, pathname]);

    // if (loading) {
    //   return <div>Loading...</div>; // 또는 스켈레톤 UI
    // }

    if (loading || (!user && pathname !== "/login") || (user && pathname === "/login")) {
      return null; // 리다이렉트 중이거나 로딩 중이므로 아무것도 렌더링하지 않음
    }

    return <WrappedComponent {...props} />;
  };
}