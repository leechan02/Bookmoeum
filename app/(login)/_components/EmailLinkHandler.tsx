"use client";
import { useEffect, useState } from "react";
import { auth } from "@/libs/firebase/config";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function EmailLinkHandler() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const completeSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }
        if (email) {
          try {
            await signInWithEmailLink(auth, email, window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            router.back(); // 로그인 성공 후 홈페이지로 이동
          } catch (error) {
            console.error("Error signing in with email link:", error);
            setError("로그인에 실패했습니다. 다시 시도해 주세요.");
          }
        }
      }
    };

    completeSignIn();
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>로그인 중입니다...</div>;
}
