"use client";

import Link from "next/link";
import LoginOption from "./LoginOption";
import { useState } from "react";
import {
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/libs/firebase/config";
import Input from "@/components/Input/Input";
import SignInSection from "./SignInSection";
import { loginWithEmailAndPassword } from "@/utils/login";
import { useRouter } from "next/navigation";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailSubmit = async (inputEmail: string) => {
    setEmail(inputEmail);
    setEmailError(null); // 이메일 에러 초기화
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      await loginWithEmailAndPassword(email, password);
      console.log("Login successful");
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error.code);
      if (error.code === "auth/wrong-password") {
        setPasswordError("비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("해당 이메일로 가입된 계정이 없습니다.");
        setShowPasswordInput(false); // 이메일 입력으로 돌아가기
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setShowPasswordReset(true);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError("비밀번호 재설정 이메일을 보내는 중 오류가 발생했습니다.");
    }
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
    setEmailError(null);
    setShowPasswordReset(false);
    setPasswordError(null);
  };

  const handleBackToLogin = () => {
    setShowSignIn(false);
    setShowPasswordInput(false);
    setShowPasswordReset(false);
    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <div className='flex justify-center items-center w-full md:w-1/2 p-4 min-h-screen'>
      <div className='flex flex-col justify-center items-center w-full max-w-[320px] sm:max-w-md'>
        <div className='flex flex-col justify-center items-center gap-6 sm:gap-10 w-full'>
          <Link href='/'>
            <img
              src='/images/LogoIcon.svg'
              alt='logo'
              className='w-10 h-10 sm:w-12 sm:h-12'
            />
          </Link>
          {showPasswordReset ? (
            <div className='flex flex-col gap-1'>
              <div className='text-center text-primary text-2xl sm:text-3xl font-medium'>
                비밀번호 재설정 메일을 보냈어요!
              </div>
              <div className='text-center text-primary text-xs sm:text-sm font-light'>
                메일이 오지 않았다면, 스팸 메일함을 확인해주세요.
              </div>
            </div>
          ) : (
            <div className='text-center text-primary text-2xl sm:text-3xl font-medium'>
              반갑습니다!
            </div>
          )}
          {error && <div className='text-error text-xs'>{error}</div>}
          {showSignIn ? (
            <SignInSection handleLogin={handleBackToLogin} />
          ) : showPasswordInput ? (
            <div className='flex flex-col justify-center items-center gap-4'>
              <Input
                type='password'
                placeholder='비밀번호를 입력하세요'
                buttonLabel='로그인'
                onSubmit={handlePasswordSubmit}
                error={passwordError}
              />
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleResetPassword}
                  className='text-sm sm:text-base text-primary hover:underline'
                >
                  비밀번호를 잊으셨나요?
                </button>
                <button
                  onClick={handleShowSignIn}
                  className='text-sm sm:text-base text-primary hover:underline'
                >
                  계정이 없으신가요?
                </button>
              </div>
            </div>
          ) : (
            <LoginOption
              handleEmailSubmit={handleEmailSubmit}
              onShowSignIn={handleShowSignIn}
              emailError={emailError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
