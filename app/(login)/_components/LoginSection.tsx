"use client";

import Link from "next/link";
import LoginOption from "./LoginOption";
import { useEffect, useState } from "react";
import { isSignInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/libs/firebase/config";
import EmailLinkHandler from "./EmailLinkHandler";

export default function LoginSection() {
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isEmailLink, setIsEmailLink] = useState(false);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setIsEmailLink(true);
    }
  }, []);

  const handleSubmit = async (inputEmail: string) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    }
    try {
      await sendSignInLinkToEmail(auth, inputEmail, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", inputEmail);
      setIsLinkSent(true);
    } catch (error) {
      console.error("Error sending sign-in link:", error);
      // 여기에 에러 처리 로직을 추가할 수 있습니다.
    }
  }

  if (isEmailLink) {
    return <EmailLinkHandler />;
  }

  return (
    <div className='inline-flex justify-center items-center w-1/2 bg-white'>
      <div className='flex-col justify-center items-center inline-flex'>
        <div className='h-screen flex-col justify-center items-center gap-10 inline-flex'>
          <Link href='/'>
            <img src='/LogoIcon.svg' alt='logo' className='w-12 h-12' />
          </Link>
          <div className='text-center text-primary text-3xl font-medium'>
            반갑습니다!
          </div>
          {isLinkSent ? (
            <div>링크를 전송했습니다</div>
          ) : (
            <LoginOption handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}