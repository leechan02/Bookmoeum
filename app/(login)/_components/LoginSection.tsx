"use client";

import Link from "next/link";
import LoginOption from "./LoginOption";
import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/libs/firebase/config";
import Input from "@/components/Input/Input";
import SignInSection from "./SignInSection";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleEmailSubmit = async (inputEmail: string) => {
    setEmail(inputEmail);
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Login error:", error.code);
      if (error.code === "auth/wrong-password") {
        setError("비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
      } else if (error.code === "auth/user-not-found") {
        setError("해당 이메일로 가입된 계정이 없습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError("비밀번호 재설정 이메일을 보내는 중 오류가 발생했습니다.");
    }
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
  };

  return (
    <div className='flex justify-center items-center w-full md:w-1/2 p-4'>
      <div className='flex flex-col justify-center items-center w-full max-w-md'>
        <div className='flex flex-col justify-center items-center gap-10 w-full'>
          <Link href='/'>
            <img src='/LogoIcon.svg' alt='logo' className='w-12 h-12' />
          </Link>
          <div className='text-center text-primary text-3xl font-medium'>
            반갑습니다!
          </div>
          {showSignIn ? (
            <SignInSection />
          ) : showPasswordInput ? (
            <>
              <Input
                type='password'
                placeholder='비밀번호를 입력하세요'
                buttonLabel='로그인'
                onSubmit={handlePasswordSubmit}
              />
              <button
                onClick={handleResetPassword}
                className='text-blue-500 hover:underline'
              >
                비밀번호를 잊으셨나요?
              </button>
            </>
          ) : (
            <LoginOption
              handleEmailSubmit={handleEmailSubmit}
              onShowSignIn={handleShowSignIn}
            />
          )}
        </div>
      </div>
    </div>
  );
}
