"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { auth } from "@/libs/firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

interface LoginOptionProps {
  handleEmailSubmit: (email: string) => void;
  onShowSignIn: () => void;
}

export default function LoginOption({
  handleEmailSubmit,
  onShowSignIn,
}: LoginOptionProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user);
      router.push("/");
    } catch (error: any) {
      console.error("Google login error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("로그인 창이 닫혔습니다. 다시 시도해 주세요.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setError("이미 로그인 창이 열려 있습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className='flex-col justify-center items-center gap-4 sm:gap-5 inline-flex w-full'>
      <div className='flex-col justify-start items-center gap-3 sm:gap-4 inline-flex w-full'>
        <Button
          icon='/IconGoogle.svg'
          label='구글로 시작하기'
          variant='secondary'
          width={400}
          onClick={handleGoogleLogin}
        />
        <Button
          icon={FiMail}
          label='이메일로 시작하기'
          variant='secondary'
          width={400}
          onClick={onShowSignIn}
        />
      </div>
      {error && <div className='text-red-500 text-sm'>{error}</div>}
      <div className='inline-flex justify-center gap-1'>
        <div className='border-b-2 border-secondary w-48 mb-[10px]'></div>
        <div className='font-medium text-secondary text-base'>or</div>
        <div className='border-b-2 border-secondary w-48 mb-[10px]'></div>
      </div>
      <Input
        type='email'
        placeholder='이메일을 입력하세요'
        buttonLabel='계속'
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
}