"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { auth } from "@/libs/firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginOptionProps {
  handleSubmit: (email: string) => void;
}

export default function LoginOption({ handleSubmit }: LoginOptionProps) {
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
      if (error.code === 'auth/popup-closed-by-user') {
        setError("로그인 창이 닫혔습니다. 다시 시도해 주세요.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError("이미 로그인 창이 열려 있습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className='flex-col justify-center items-center gap-5 inline-flex'>
      <div className='flex-col justify-start items-center gap-4 inline-flex'>
        <Button
          icon='/IconGoogle.svg'
          label='구글로 시작하기'
          variant='secondary'
          width={400}
          onClick={handleGoogleLogin}
        />
        <Button label='다른 옵션 없음' variant='secondary' width={400} />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className='inline-flex justify-center gap-1'>
        <div className='border-b-2 border-secondary w-48 mb-[10px]'></div>
        <div className='font-medium text-secondary text-base'>or</div>
        <div className='border-b-2 border-secondary w-48 mb-[10px]'></div>
      </div>
      <Input
        type='email'
        placeholder='이메일을 입력하세요'
        buttonLabel='계속'
        onSubmit={handleSubmit}
      />
    </div>
  );
}