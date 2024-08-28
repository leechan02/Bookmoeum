"use client";

import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    // if (loading) {
    //   return <div>Loading...</div>; // 또는 스켈레톤 UI
    // }

    if (!user) {
      return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
    }

    return <WrappedComponent {...props} />;
  };
}